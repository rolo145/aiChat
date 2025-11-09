import { sendMessageToAIStreamed } from "@/services/chatService";
import { useMessagesStore } from "@/stores/messages";
import { SENDER_TYPE } from "@/types/Message";
import { createPinia, setActivePinia } from "pinia";

vi.mock("@/services/chatService");

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

describe("useMessagesStore", () => {
  it("init a clearing messages", () => {
    const store = useMessagesStore();

    expect(store.messages).toStrictEqual([]);
    expect(store.loading).toBeFalsy();

    store.messages.push({
      id: "1",
      sender: SENDER_TYPE.USER,
      text: "test",
      timestamp: Date.now(),
    });

    store.clearChat();

    expect(store.messages).toStrictEqual([]);
  });

  it("not send whitespace-only messages", async () => {
    const store = useMessagesStore();

    await store.sendMessage("   ");

    expect(store.messages).toStrictEqual([]);
    expect(sendMessageToAIStreamed).not.toHaveBeenCalled();
  });

  it("add user message and AI message when sending", async () => {
    const store = useMessagesStore();
    const mockMessage = {
      id: "test-id",
      sender: SENDER_TYPE.AI,
      text: "AI response",
      timestamp: Date.now(),
    };
    vi.mocked(sendMessageToAIStreamed).mockResolvedValue(mockMessage);

    await store.sendMessage("Hello");

    expect(store.messages).toHaveLength(2);
    expect(store.messages[0]?.sender).toBe(SENDER_TYPE.USER);
    expect(store.messages[0]?.text).toBe("Hello");
    expect(store.messages[1]?.sender).toBe(SENDER_TYPE.AI);
    expect(store.messages[1]?.text).toBe("");
  });

  it("set loading to true during message sending", async () => {
    const store = useMessagesStore();
    let loadingDuringCall = false;

    vi.mocked(sendMessageToAIStreamed).mockImplementation(async () => {
      loadingDuringCall = store.loading;
      return {
        id: "test-id",
        sender: SENDER_TYPE.AI,
        text: "AI response",
        timestamp: Date.now(),
      };
    });

    await store.sendMessage("Hello");

    expect(loadingDuringCall).toBeTruthy();
    expect(store.loading).toBeFalsy();
  });

  it("update AI message text with chunks", async () => {
    const store = useMessagesStore();

    vi.mocked(sendMessageToAIStreamed).mockImplementation(async (text, onChunk) => {
      onChunk("Hello ");
      onChunk("world");
      return {
        id: "test-id",
        sender: SENDER_TYPE.AI,
        text: "Hello world",
        timestamp: Date.now(),
      };
    });

    await store.sendMessage("Test");

    const aiMessage = store.messages[1];
    expect(aiMessage?.text).toBe("Hello world");
  });

  it("call onChunkReceived callback for each chunk", async () => {
    const store = useMessagesStore();
    const onChunkReceived = vi.fn();

    vi.mocked(sendMessageToAIStreamed).mockImplementation(async (text, onChunk) => {
      onChunk("chunk1");
      onChunk("chunk2");
      return {
        id: "test-id",
        sender: SENDER_TYPE.AI,
        text: "chunk1chunk2",
        timestamp: Date.now(),
      };
    });

    await store.sendMessage("Test", onChunkReceived);

    expect(onChunkReceived).toHaveBeenCalledTimes(2);
  });

  it("call onComplete callback after sending", async () => {
    const store = useMessagesStore();
    const onComplete = vi.fn();

    const mockMessage = {
      id: "test-id",
      sender: SENDER_TYPE.AI,
      text: "AI response",
      timestamp: Date.now(),
    };
    vi.mocked(sendMessageToAIStreamed).mockResolvedValue(mockMessage);

    await store.sendMessage("Test", undefined, onComplete);

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("should set loading to false even if sending fails", async () => {
    const store = useMessagesStore();
    const onComplete = vi.fn();

    vi.mocked(sendMessageToAIStreamed).mockRejectedValue(new Error("API Error"));

    await expect(store.sendMessage("Test", undefined, onComplete)).rejects.toThrow("API Error");
    expect(store.loading).toBeFalsy();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
