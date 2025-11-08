<script setup lang="ts">
/**
 * Main application component.
 */
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>
<template>
  <div id="app">
    <header class="app-header">
      <h1>AI Chat Demo</h1>

      <button
        class="theme-toggle"
        @click="toggleDark()">
        {{ isDark ? "☀️ Light" : "🌙 Dark" }}
      </button>
    </header>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  color: white;
  padding: 1rem 2rem;
  box-shadow: var(--shadow);
}

.theme-toggle {
  font-size: 1.4rem;
  background: transparent;
  border: .1rem solid rgba(255, 255, 255, .4);
  color: white;
  border-radius: var(--radius);
  padding: .4rem 1rem;
  cursor: pointer;
  transition: background .2s;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, .15);
}
</style>

<style>
  @import "@/assets/main.css";
</style>
