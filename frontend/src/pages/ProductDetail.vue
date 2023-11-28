<template>
  <div
    class="bg-gradient-to-r from-slate-200 from-10% via-slate-300 via-30% to-slate-200 to-90%"
  >
    <div class="container py-8 grid grid-cols-4 gap-4" v-if="product">
      <div class="flex justify-end col-span-2">
        <div class="w-[50%] h-[400px]">
          <img
            class="rounded-md w-full h-full object-cover"
            :src="product.image"
            alt=""
          />
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-between col-span-2">
        <div class="">
          <h1 class="text-2xl font-semibold uppercase text-black">
            {{ product.title }}
          </h1>
          <p class="leading-10 text-black">
            {{ product.description }}
          </p>

          <div class="flex mb-2 gap-2 items-center mt-4">
            <span class="text-black">Giá: </span>
            <span class="font-semibold text-red-600">
              {{ (product.price * quantity).toLocaleString() }}
              <u class="no-underline">VND</u></span
            >
          </div>
          <div class="flex mb-2 gap-2 items-center mt-4">
            <div class="text-black">
              <span class="">Số lượng: </span>
            </div>
            <div class="flex gap-2 text-black">
              <button
                @click="onQuantityChange('decrease')"
                class="border-[1px] py-1 px-2 rounded-md font-semibold w-8 border-black"
              >
                -
              </button>
              <span
                class="font-semibold mx-1 py-1 border rounded px-3 border-black"
                >{{ quantity }}</span
              >
              <button
                @click="onQuantityChange('increase')"
                class="border-[1px] py-1 px-2 rounded-md font-semibold w-8 border-black"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button
            :disabled="loading"
            @click="
              handleAddToCart({
                product,
                // size,
                quantityInStock,
                quantity,
                price: product.price * quantity,
              })
            "
            class="text-center w-full bg-gradient-to-r text-white from-red-700 to-yellow-500 hover:from-blue-500 hover:to-green-500 py-3 font-bold rounded"
          >
            Thêm vào giỏ
          </button>
          <router-link :to="{ name: 'Cart' }">
            <button
              class="mt-2 text-center text-white w-full bg-gradient-to-r from-red-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-3 font-bold rounded"
            >
              Mua ngay
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/Product/CardProduct.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "@vue/reactivity";
import { cartApi } from "@/api/cartApi";
export default {
  components: { CardProduct },
  setup() {
    // Hooks
    const store = useStore();
    const route = useRoute();

    // Ref
    // const size = ref("S"); // "F", "M"
    const quantity = ref(1);
    //quantity in stock
    //const quantityInStock = ref(quantityInStock);
    // Status before call api
    const loading = ref(false);

    // Actions
    store.dispatch("products/getProductDetail", { id: route.params.id });

    // Data
    const productDetail = computed(() => store.state.products.productDetail);

    // Function global
    // const onSizeClick = (sizeParam) => {
    //   size.value = sizeParam;
    // };

    const onQuantityChange = (type) => {
      if (type === "increase") {
        // Check if increasing quantity exceeds available stock
        if (quantity.value < productDetail.value.quantitySum) {
          quantity.value++;
        } else {
          alert("Requested quantity exceeds available stock");
        }
      } else {
        if (quantity.value > 1) quantity.value--;
      }
    };

    // Submit
    const handleAddToCart = async () => {
      // Check if the requested quantity exceeds available stock
      if (quantity.value > productDetail.value.quantitySum) {
        alert("Requested quantity exceeds available stock");
        return;
      }

      // Submit data
      loading.value = true;
      try {
        // Add the product to the cart
        await cartApi.addToCart({
          product: productDetail.value,
          quantity: quantity.value,
          price: productDetail.value.price * quantity.value,
        });

        // Update data in vuex store
        store.dispatch("carts/getCarts");

        // Update quantitySum in the product
        await productsApi.updateProductQuantity({
          id: productDetail.value._id,
          quantity: productDetail.value.quantitySum - quantity.value,
        });

        alert("Add to cart successfully");
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      product: productDetail,
      //size,
      quantity,
      // onSizeClick,
      // quantityInStock,
      onQuantityChange,
      handleAddToCart,
      loading,
    };
  },
};
</script>

<style></style>
