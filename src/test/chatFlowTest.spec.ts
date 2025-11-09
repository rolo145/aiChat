import App from "@/App.vue";
import ChatInput from "@/components/ChatInput.vue";
import {
  createDefaultPinia,
  nextTick,
  TestWrapperBuilder,
} from "@/test/testUtils";
import ChatView from "@/views/ChatView.vue";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

// Mock the chat service to control responses
vi.mock("@/services/chatService");

// Mock crypto.randomUUID for consistent test IDs
const mockUUID = vi.fn();
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: mockUUID,
  },
});

let wrapper: VueWrapper;

beforeEach(() => {
  vi.clearAllMocks();
  mockUUID.mockReturnValue("test-uuid-123");
});

async function createWrapper() {
  const pinia = createDefaultPinia();
  const testWrapper = new TestWrapperBuilder()
    .createComponent(App)
    .addPlugin(pinia)
    .setRouter()
    .build();
  wrapper = testWrapper.wrapper;

  // Navigate to the chat route and wait for it to be ready
  await testWrapper.router.push("/");
  await testWrapper.router.isReady();
  await flushPromises();
}

async function sendMessage(text: string) {
  const input = wrapper.get("input[type=\"text\"]");

  // Type a message
  await input.setValue(text);
  await nextTick(wrapper, 1);
  expect((input.element as HTMLInputElement).value).toBe(text);

  // Click send button
  await wrapper.get("form.chat-input").trigger("submit");
  await flushPromises();
}

afterEach(() => {
  wrapper?.unmount();
});

describe("Chat Flow Integration Tests", () => {
  it("layout and dark/light mode toggling", async () => {
    await createWrapper();

    expect(wrapper.get("header h1").text()).toBe("AI Chat Demo");

    const mainContent = wrapper.get("main.app-content");
    expect(mainContent.findComponent(ChatView).exists()).toBeTruthy();
    expect(mainContent.findComponent(ChatInput).exists()).toBeTruthy();

    const themeToggle = wrapper.get("button.theme-toggle");
    await themeToggle.trigger("click");
    await nextTick(wrapper, 1);
    expect(themeToggle.text()).toBe("☀️ Light");

    await themeToggle.trigger("click");
    await nextTick(wrapper, 1);
    expect(themeToggle.text()).toBe("🌙 Dark");
  });

  it("should send a message and display it in the chat", async () => {
    await createWrapper();
    await sendMessage("Hello AI!");
    const messages = wrapper.findAll(".message");
    expect(messages.length).toBeGreaterThanOrEqual(2);

    const [userMessage, aiMessage] = messages;
    expect(userMessage?.classes("user")).toBeTruthy();
    expect(userMessage?.text()).toBe("Hello AI!");
    expect(aiMessage?.classes("ai")).toBeTruthy();
  });
});
