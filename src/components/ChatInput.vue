<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  loading: boolean,
}>();

const emit = defineEmits<{
  (e: "send", text: string): void,
}>();

const text = ref("");
const inputRef = ref<HTMLInputElement>();

// Expose focus method to parent component
const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

// Initial focus when component mounts
onMounted(() => {
  focusInput();
});

// Expose the method so parent can call it
defineExpose({
  focusInput,
});

const handleSubmit = () => {
  emit("send", text.value);
  text.value = "";
};
</script>

<template>
  <form
    class="chat-input"
    @submit.prevent="handleSubmit">
    <input
      ref="inputRef"
      v-model="text"
      type="text"
      placeholder="Type your message..."
      :disabled="loading"
    />
    <button :disabled="loading || !text.trim()">
      {{ loading ? "..." : 'Send' }}
    </button>
  </form>
</template>

<style scoped>
.chat-input {
  display: flex;
  gap: 1rem;
  border-top: 1px solid rgba(0, 0, 0, .1);
  padding-top: 1rem;
}

.chat-input input {
  flex: 1;
  padding: 1rem;
  border: .1rem solid rgba(0, 0, 0, .1);
  border-radius: var(--radius);
  font-size: 1.6rem;
  outline: none;
}

.chat-input button {
  padding: 1rem 1.6rem;
  font-size: 1.6rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background .2s;
}

.chat-input button:disabled {
  opacity: .6;
  cursor: not-allowed;
}
</style>
