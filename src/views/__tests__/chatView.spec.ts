import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ChatView from "@/views/ChatView.vue";
import ChatWindow from "@/components/ChatWindow.vue";
import { TestWrapperBuilder } from "@/test/testUtils";

// Mock the ChatWindow component since we're testing ChatView in isolation
vi.mock("@/components/ChatWindow.vue", () => ({
  default: {
    name: "ChatWindow",
    template: "<div data-testid=\"chat-window\">Mocked ChatWindow</div>",
  },
}));

let wrapper: VueWrapper;

function createWrapper() {
  const testWrapper = new TestWrapperBuilder()
    .createComponent(ChatView)
    .build();
  wrapper = testWrapper.wrapper;
}

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

afterEach(() => {
  wrapper?.unmount();
});

describe("chatView component", () => {
  it("render and layout", () => {
    createWrapper();
    expect(wrapper.classes("chat-view")).toBeTruthy();

    const chatViewDiv = wrapper.get(".chat-view");
    expect(chatViewDiv.findComponent(ChatWindow).exists()).toBeTruthy();
  });

  it("should mount without errors", () => {
    expect(() => mount(ChatView)).not.toThrow();
  });

  it("should properly unmount without errors", () => {
    createWrapper();

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
