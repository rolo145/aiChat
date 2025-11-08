<script setup lang="ts">
/**
 * Chat view component.
 */
import ChatWindow from "@/components/ChatWindow.vue";
</script>

<template>
  <div class="chat-view">
    <ChatWindow />
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 8rem);
  background: var(--bg);
  padding: 2rem;
}
</style>
