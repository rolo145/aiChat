<script setup lang="ts">
/**
 * Main chat window component.
 */
import { nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMessagesStore } from "@/stores/messages";
import ChatInput from "@/components/ChatInput.vue";

const store = useMessagesStore();
const {
  messages,
  loading,
} = storeToRefs(store);

// Reference to the messages container and input
const messagesContainer = ref<HTMLElement>();
const chatInputRef = ref<InstanceType<typeof ChatInput>>();

// Scroll to bottom function
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Focus input function
const focusInput = async () => {
  if (chatInputRef.value) {
    await nextTick();
    chatInputRef.value.focusInput();
  }
};

// Functions are now called via callbacks from store
const handleSend = (text: string) => {
  if (text.trim()) {
    store.sendMessage(
      text,
      () => scrollToBottom(), // Called after each chunk
      () => focusInput(), // Called when complete
    );
  }
};
</script>

<template>
  <div class="chat-window">
    <div
      ref="messagesContainer"
      class="messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message"
        :class="msg.sender">
        <p>{{ msg.text }}</p>
      </div>

      <!-- AI typing indicator -->
      <div
        v-if="loading"
        class="typing-indicator">
        AI is typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </div>
    </div>

    <ChatInput
      ref="chatInputRef"
      :loading="loading"
      @send="handleSend" />
  </div>
</template>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  max-width: 60rem;
  width: 100%;
  height: 70vh;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
}

.message {
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  max-width: 80%;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  word-break: break-word;
}

.message p {
  color: inherit;
}

.message.user {
  background: var(--primary);
  color: white;
  align-self: flex-end;
}

.message.ai {
  background: var(--bg);
  color: var(--text);
  align-self: flex-start;
}

/* typing indicator animation */
.typing-indicator {
  align-self: flex-start;
  color: var(--text-secondary);
  font-style: italic;
  padding-left: 1rem;
}

.dot {
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) {
  animation-delay: .2s;
}

.dot:nth-child(3) {
  animation-delay: .4s;
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
</style>
