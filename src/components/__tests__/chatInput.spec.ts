import ChatInput from "@/components/ChatInput.vue";
import { TestWrapperBuilder } from "@/test/testUtils";
import { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";

let wrapper: VueWrapper;

function createWrapper(props: {
  loading: boolean,
}) {
  const testWrapper = new TestWrapperBuilder()
    .createComponent(ChatInput)
    .setPropsData(props)
    .build();
  wrapper = testWrapper.wrapper;
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  wrapper?.unmount();
});

describe("ChatInput", () => {
  it("layout, loading false", () => {
    createWrapper({ loading: false });

    expect(wrapper.find("form.chat-input").exists()).toBeTruthy();

    const input = wrapper.get("input[type=\"text\"]");
    expect(input.attributes("placeholder")).toBe("Type your message...");

    const button = wrapper.get("button");
    expect(button.text()).toBe("Send");
  });

  it("layout, loading true", () => {
    createWrapper({ loading: true });

    const input = wrapper.get("input[type=\"text\"]");
    expect(input.element.disabled).toBeTruthy();

    const button = wrapper.get("button");
    expect(button.text()).toBe("...");
    expect(button.element.disabled).toBeTruthy();
  });

  it("enable/disable button based on text content", async () => {
    createWrapper({ loading: false });

    const input = wrapper.find("input[type=\"text\"]");
    const button = wrapper.find("button");

    // Initially disabled (empty text)
    expect(button.element.disabled).toBeTruthy();

    // Enable when text is entered
    await input.setValue("Hello");
    expect(input.element.value).toBe("Hello");
    expect(button.element.disabled).toBeFalsy();

    // Disable when only whitespace
    await input.setValue("   ");
    expect(button.element.disabled).toBeTruthy();
  });

  it("send event on form submission", async () => {
    createWrapper({ loading: false });

    const input = wrapper.find("input[type=\"text\"]");
    const form = wrapper.find("form.chat-input");

    await input.setValue("Test message");
    await form.trigger("submit");

    expect(wrapper.emitted("send")).toBeTruthy();
    expect(wrapper.emitted("send")?.[0]).toStrictEqual(["Test message"]);

    await nextTick();

    expect(input.element.value).toBe("");
  });

  it("emit send event on button click", async () => {
    createWrapper({ loading: false });

    const input = wrapper.find("input[type=\"text\"]");
    const button = wrapper.find("button");

    await input.setValue("Test message");
    await button.trigger("click");

    expect(wrapper.emitted("send")).toBeTruthy();
    expect(wrapper.emitted("send")?.[0]).toStrictEqual(["Test message"]);
  });

  it("handle empty message submission gracefully", async () => {
    createWrapper({ loading: false });

    const form = wrapper.find("form.chat-input");
    await form.trigger("submit");

    expect(wrapper.emitted("send")).toBeTruthy();
    expect(wrapper.emitted("send")?.[0]).toStrictEqual([""]);

    const input = wrapper.find("input[type=\"text\"]");
    await input.setValue("   ");
    await form.trigger("submit");

    expect(wrapper.emitted("send")).toBeTruthy();
    expect(wrapper.emitted("send")?.[1]).toEqual(["   "]);
  });

  it("should have focusInput method exposed", () => {
    createWrapper({ loading: false });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).focusInput).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(typeof (wrapper.vm as any).focusInput).toBe("function");
  });

  it("handle rapid successive submissions", async () => {
    createWrapper({ loading: false });

    const input = wrapper.find("input[type=\"text\"]");
    const form = wrapper.find("form.chat-input");

    await input.setValue("Message 1");
    await form.trigger("submit");
    await nextTick();

    await input.setValue("Message 2");
    await form.trigger("submit");
    await nextTick();

    expect(wrapper.emitted("send")).toHaveLength(2);
    expect(wrapper.emitted("send")?.[0]).toEqual(["Message 1"]);
    expect(wrapper.emitted("send")?.[1]).toEqual(["Message 2"]);
  });

  it("should handle special characters in input", async () => {
    createWrapper({ loading: false });

    const input = wrapper.find("input[type=\"text\"]");
    const form = wrapper.find("form.chat-input");
    const specialText = "Hello! @#$%^&*() 你好 🎉";

    await input.setValue(specialText);
    await form.trigger("submit");

    expect(wrapper.emitted("send")?.[0]).toEqual([specialText]);
  });

  it("should handle very long text input", async () => {
    createWrapper({ loading: false });

    const input = wrapper.find("input[type=\"text\"]");
    const form = wrapper.find("form.chat-input");
    const longText = "a".repeat(1000);

    await input.setValue(longText);
    await form.trigger("submit");

    expect(wrapper.emitted("send")?.[0]).toEqual([longText]);
  });
});
