import { defineAsyncComponent } from "vue";
export const registerGlobalComponent = (app) => {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layouts/AuthLayout.vue"))
  );
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/DefaultLayout.vue"))
  );
};
