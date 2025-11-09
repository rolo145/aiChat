import ChatWindow from "@/components/ChatWindow.vue";
import ChatInput from "@/components/ChatInput.vue";
import { useMessagesStore } from "@/stores/messages";
import { SENDER_TYPE, type Message } from "@/types/Message";
import { TestWrapperBuilder, createDefaultPinia, nextTick } from "@/test/testUtils";
import { VueWrapper } from "@vue/test-utils";

createDefaultPinia();

let wrapper: VueWrapper;
const messagesStore = useMessagesStore();

function createWrapper() {
  const testWrapper = new TestWrapperBuilder()
    .createComponent(ChatWindow)
    .build();

  wrapper = testWrapper.wrapper;
}

beforeEach(() => {
  messagesStore.$reset();
  vi.clearAllMocks();
});

afterEach(() => {
  wrapper?.unmount();
});

describe("ChatWindow", () => {
  it("renders empty chat window initially", () => {
    createWrapper();

    expect(wrapper.classes("chat-window")).toBeTruthy();
    expect(wrapper.find(".messages").exists()).toBeTruthy();
    expect(wrapper.findComponent(ChatInput).exists()).toBeTruthy();

    // No messages initially
    expect(wrapper.findAll(".message")).toHaveLength(0);
    expect(wrapper.find(".typing-indicator").exists()).toBeFalsy();
  });

  it("displays messages from store", async () => {
    const mockMessages: Message[] = [
      {
        id: "1",
        sender: SENDER_TYPE.USER,
        text: "Hello",
        timestamp: Date.now(),
      },
      {
        id: "2",
        sender: SENDER_TYPE.AI,
        text: "Hi there!",
        timestamp: Date.now(),
      },
    ];

    messagesStore.messages = mockMessages;

    createWrapper();

    const messageElements = wrapper.findAll(".message");
    expect(messageElements).toHaveLength(2);

    const [userMessage, aiMessage] = messageElements;

    expect(userMessage?.classes()).toContain("user");
    expect(userMessage?.text()).toBe("Hello");

    expect(aiMessage?.classes()).toContain("ai");
    expect(aiMessage?.text()).toBe("Hi there!");

    messagesStore.messages.push({
      id: "1",
      sender: SENDER_TYPE.USER,
      text: "New message",
      timestamp: Date.now(),
    });
    await nextTick(wrapper, 1);
    expect(wrapper.findAll(".message")).toHaveLength(3);
  });

  it("typing indicator when loading", async () => {
    createWrapper();

    messagesStore.loading = true;
    await nextTick(wrapper, 1);

    expect(wrapper.get(".typing-indicator").text()).toBe("AI is typing...");

    const chatInput = wrapper.findComponent(ChatInput);
    expect(chatInput.props("loading")).toBeTruthy();

    messagesStore.loading = false;
    await nextTick(wrapper, 1);

    expect(wrapper.find(".typing-indicator").exists()).toBeFalsy();

    expect(chatInput.props("loading")).toBeFalsy();
  });

  it("handles send event from ChatInput", async () => {
    createWrapper();

    // Mock the sendMessage method
    const sendMessageSpy = vi.spyOn(messagesStore, "sendMessage").mockImplementation(() => Promise.resolve());

    const chatInput = wrapper.findComponent(ChatInput);
    await chatInput.get("input[type=\"text\"]").setValue("Test message");
    await chatInput.trigger("submit");

    expect(sendMessageSpy).toHaveBeenCalledWith(
      "Test message",
      expect.any(Function), // scrollToBottom callback
      expect.any(Function), // focusInput callback
    );
  });
});
