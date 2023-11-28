<template>
  <div
    class="bg-gradient-to-r from-slate-200 from-10% via-slate-300 via-30% to-slate-200 to-90%"
  >
    <div
      class="container max-w-4xl mx-auto py-6 px-4 sm:px-6 md:px-8"
      v-if="user"
    >
      <h1
        class="text-center capitalize text-2xl sm:text-3xl text-black mb-4 sm:mb-6"
      >
        LỊCH SỬ MUA HÀNG
      </h1>
      <div class="border-b-2 border-black"></div>
      <!-- Start: Render cart -->

      <div
        class="flex flex-col sm:flex-row justify-between w-full my-4"
        v-for="cart in carts"
        :key="cart._id"
      >
        <!-- Info -->
        <div class="flex gap-4">
          <div class="w-[100px] h-[100px] rounded-md overflow-hidden">
            <img
              class="w-full h-full object-cover"
              :src="cart.product.image"
              alt=""
            />
          </div>

          <div class="">
            <h1 class="text-base font-semibold text-black">
              {{ cart.product.title }}
            </h1>
            <p class="text-black text-sm my-2">
              <span class="text-black">Số lượng: </span> {{ cart.quantity }}
            </p>
            <!--
           
         !-->
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-base text-red-500">
            {{ cart.price.toLocaleString() }} đ
          </p>
          <!-- Action -->
        </div>
      </div>
      <!--TotalPrice-->
      <div
        class="flex items-center justify-between border-t-2 border-b-2 border-black py-2 sm:py-4"
      >
        <p class="text-sm font-medium text-gray-900">Đơn hàng:</p>
        <p class="font-semibold text-red-600">
          {{
            carts
              .reduce((acc, cur) => acc + cur.price * cur.quantity, 30000)
              .toLocaleString()
          }}
          <u>đ</u>
        </p>
      </div>
    </div>

    <!-- Start: Render when not product -->
    <div class="my-4" v-if="carts.length === 0">
      <h1 class="text-center text-lg sm:text-xl">
        Bạn không có sản phẩm nào!!!
      </h1>
      <router-link :to="{ name: 'Product' }" class="text-center">
        <p class="text-center hover:underline text-blue-700 my-2">
          Xem sản phẩm
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    // Hooks
    const store = useStore();

    const carts = computed(() => store.getters["carts/cartOrdered"]);
    const user = computed(() => store.state.user.user);

    // Actions
    store.dispatch("receipts/getReceipts");
    return {
      carts,
      user,
    };
  },
};
</script>

<style></style>
