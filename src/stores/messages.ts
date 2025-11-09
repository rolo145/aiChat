import { sendMessageToAIStreamed } from "@/services/chatService";
import { SENDER_TYPE, type Message } from "@/types/Message";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Pinia store for managing chat messages and state
 */
export const useMessagesStore = defineStore("messages", () => {
  const messages = ref<Message[]>([]);
  const loading = ref(false);

  const sendMessage = async (
    text: string,
    onChunkReceived?: () => void,
    onComplete?: () => void,
  ) => {
    if (!text.trim()) { return; }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: SENDER_TYPE.USER,
      text,
      timestamp: Date.now(),
    };
    messages.value.push(userMessage);

    loading.value = true;

    // empty AI message to be filled as chunks arrive
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      sender: SENDER_TYPE.AI,
      text: "",
      timestamp: Date.now(),
    };
    messages.value.push(aiMessage);

    try {
      await sendMessageToAIStreamed(text, async (chunk) => {
        const lastIndex = messages.value.length - 1;
        const currentMessage = messages.value[lastIndex];

        if (currentMessage && currentMessage.id === aiMessage.id) {
          Object.assign(currentMessage, {
            text: currentMessage.text + chunk,
          });
        }

        // Call callback for each chunk (for scrolling)
        if (onChunkReceived) {
          onChunkReceived();
        }
      });
    } finally {
      loading.value = false;
      // Call callback when complete (for focusing input)
      if (onComplete) {
        onComplete();
      }
    }
  };

  const clearChat = () => {
    messages.value = [];
  };

  const $reset = () => {
    messages.value = [];
    loading.value = false;
  };

  return {
    // State
    messages,
    loading,

    // Actions
    sendMessage,
    clearChat,

    // Reset
    $reset,
  };
});
