<template>
  <main
    class="bg-gradient-to-r from-slate-200 from-10% via-slate-300 via-30% to-slate-200 to-90%"
  >
    <Banner />
    <SellingProduct />
    <ProductPamples />
  </main>
</template>

<script>
//import SliderAuto from "@/components/Home/SliderAuto.vue";
import Banner from "../components/Home/Banner.vue";
import SellingProduct from "@/components/Product/SellingProduct.vue";
//import PromotionalProducts from "@/components/Product/PromotionalProducts.vue";
import ProductPamples from "@/components/Home/ProductPamples.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  components: {
    Banner,
    SellingProduct,

    ProductPamples,
  },
  setup() {
    // Hooks
    const store = useStore();

    // Actions
    store.dispatch("products/getProducts", { page: 1 });

    // Data
    const featureProduct = computed(() => {
      const data = store.state.products.products;

      return data.slice(0, 2);
    });

    const moreProduct = computed(() => {
      const data = store.state.products.products;

      return data.slice(0, 6);
    });

    const error = computed(() => {
      return store.state.products.error;
    });
    return {
      featureProduct,
      moreProduct,
      error,
    };
  },
};
</script>

<style></style>
