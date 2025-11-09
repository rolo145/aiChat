/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  mount,
  VueWrapper,
} from "@vue/test-utils";
import router from "@/router";
import _set from "lodash/set";
import { createPinia, setActivePinia } from "pinia";
import { createApp, type App } from "vue";
import type {
  Router,
} from "vue-router";

export const createDefaultPinia = () => {
  const store = createPinia();
  setActivePinia(store);
  return store;
};

/**
 * Wrapper for component wrapper and router
 */
export interface TestWrapper {
  wrapper: VueWrapper<any>,
  router: Router,
}

/**
 * Wrapper for component and host component
 * for testing composables
 */
export interface TestHostComponentWrapper {
  composable: any,
  app: App<Element>,
  router: Router,
}

/**
 * Builder for test purpose - mounting VueJS components
 */
export class TestWrapperBuilder {
  testComponent: any;

  testRouter: Router;

  testPropsData: {};

  testStubs: Record<string, any>;

  plugins: any[];

  directives: {};

  slots: {};

  provide: {};

  attachToDoc = false;

  shallow;

  testComposable: {
    composableFce?: CallableFunction,
    composableProps?: any,
  };

  constructor() {
    this.testComponent = {};
    this.testRouter = {} as Router;
    this.testPropsData = {};
    this.testStubs = {};
    this.plugins = [];
    this.slots = {};
    this.provide = {};
    this.shallow = false;
    this.directives = {};
    this.testComposable = {};
  }

  /**
   * Creates component for testing
   * @param component - tested component
   * @returns
   */
  createComponent(component: any): TestWrapperBuilder {
    this.testComponent = component;
    return this;
  }

  setRouter(): TestWrapperBuilder {
    this.testRouter = router;
    this.plugins.push(router);
    return this;
  }

  /**
   * Sets component props data
   * @param propsData - component props
   * @returns
   */
  setPropsData(propsData: {}): TestWrapperBuilder {
    this.testPropsData = propsData;
    return this;
  }

  /**
  * Creates I18n for testing
  * @returns
  */
  useI18n(i18n: any): TestWrapperBuilder {
    this.plugins.push(i18n);
    return this;
  }

  /**
   * Adds global plugin
   * @param plugin
   * @returns
   */
  addPlugin(plugin: any): TestWrapperBuilder {
    this.plugins.push(plugin);
    return this;
  }

  /**
   * Sets component stubs
   * @param stubs - stubs
   * @returns
   */
  setStubs(stubs: Record<string, any>): TestWrapperBuilder {
    this.testStubs = stubs;
    return this;
  }

  setSlots(slots: {}): TestWrapperBuilder {
    this.slots = slots;
    return this;
  }

  setProvide(provide: {}): TestWrapperBuilder {
    this.provide = provide;
    return this;
  }

  /**
   * Attach the component to the document body
   */
  attachToDocument(): TestWrapperBuilder {
    this.attachToDoc = true;
    return this;
  }

  /**
   * Sets shallow mount to true
   * @returns
   */
  setShallow(): TestWrapperBuilder {
    this.shallow = true;
    return this;
  }

  addDirectives(directives: {}): TestWrapperBuilder {
    this.directives = {
      ...this.directives,
      ...directives,
    };
    return this;
  }

  /**
   * Builds TestWrapper
   *    - mounts VueJS component
   * @returns TestWrapper object
   */
  build(): TestWrapper {
    const opts = {
      shallow: this.shallow,
      propsData: this.testPropsData,
      global: {
        stubs: this.testStubs,
        plugins: this.plugins,
        provide: this.provide,
        directives: this.directives,
      },
      slots: this.slots,
    };
    if (this.attachToDoc) {
      _set(opts, "attachTo", document.body);
    }
    const wrapper = mount(this.testComponent, opts);
    return {
      wrapper,
      router: this.testRouter,
    };
  }

  /**
   * Builds empty host component for testing composables
   * which relies on lifecycle hooks or provide/inject
   * @returns
   */
  buildHostComponentWrapper(): TestHostComponentWrapper {
    const composable = this.testComposable;
    let composableResult: any;
    const app = createApp({
      setup() {
        if (composable.composableFce) {
          composableResult = composable.composableFce(...composable.composableProps);
        }
        // suppress missing template warning
        return () => {};
      },
    });
    this.plugins.every((plugin) => app.use(plugin));
    app.mount(document.createElement("div"));
    // return the result and the app instance
    // for testing provide/unmount/locales etc...
    return {
      composable: composableResult,
      app,
      router: this.testRouter,
    };
  }
}

/**
 * Waits for a given number of ticks
 *
 * @param wrapper - test wrapper
 * @param count - number of ticks to wait
 */
export const nextTick = async (wrapper: VueWrapper, count: number) => {
  for (let i = 0; i < count; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await wrapper.vm.$nextTick();
  }
};

/**
 *
 * @param conditionFce
 * @param timeoutMs
 * @param message
 * @returns
 */
export const sleepUntil = async (
  conditionFce: () => boolean,
  timeoutMs = 1000,
  message = "Timeout expired",
): Promise<void> => new Promise<void>((resolve, reject) => {
  const timeWas = new Date().getTime();
  const wait = setInterval(() => {
    if (conditionFce()) {
      clearInterval(wait);
      resolve();
    } else if (new Date().getTime() - timeWas > timeoutMs) {
      clearInterval(wait);
      reject(new Error(message));
    }
  }, 20);
});
