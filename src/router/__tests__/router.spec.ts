import router from "@/router/index";
import ChatView from "@/views/ChatView.vue";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

// Mock ChatView component for isolation
vi.mock("@/views/ChatView.vue", () => ({
  default: {
    name: "ChatView",
    template: "<div data-testid=\"chat-view\">Mocked ChatView</div>",
  },
}));

beforeEach(async () => {
  // Reset router to initial state before each test
  await router.push("/");
  await router.isReady();
});

describe("Router test", () => {
  it("check router configuration", () => {
    expect(router).toBeDefined();
    expect(router.options.history).toBeDefined();
    expect(router.options.routes).toHaveLength(1);

    const routes = router.getRoutes();
    const chatRoute = routes[0];
    expect(chatRoute?.path).toBe("/");
    expect(chatRoute?.name).toBe("chat");
    expect(chatRoute?.components?.default).toBe(ChatView);

    expect(router.currentRoute.value.path).toBe("/");
    expect(router.currentRoute.value.name).toBe("chat");
  });
});
