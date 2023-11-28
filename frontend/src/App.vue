<template>
  <component :is="layout">
    <div id="root" class="w-full overflow-hidden bg-gray-100">
      <div class="content-wrapper max-w-screen-2xl text-base mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </component>
</template>
<script>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => (route.meta.layout || "default") + "-layout"),
    };
  },
};
</script>

<style scoped></style>
