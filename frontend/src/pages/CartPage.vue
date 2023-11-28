<template>
  <div
    class="bg-gradient-to-r from-slate-200 from-10% via-slate-300 via-30% to-slate-200 to-90%"
  >
    <div class="container max-w-4xl mx-auto py-3" v-if="user">
      <h1 class="text-center capitalize text-2xl">GIỎ HÀNG CỦA BẠN</h1>
      <div class="border-b-2 border-black pt-2"></div>
      <!-- Start: Render cart -->

      <div v-for="cart in carts" :key="cart._id">
        <div class="flex justify-between w-full my-4">
          <!-- Info -->

          <div class="flex gap-4">
            <div class="w-[150px] h-[150px] rounded-md overflow-hidden">
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
              <p class="text-sm my-2 text-black">
                <span class="">Số lượng: </span> {{ cart.quantity }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-base text-red-500">
              {{ (cart.price * cart.quantity).toLocaleString() }}
              <u class="no-underline">VND</u>
            </p>
            <!-- Action -->
            <div class="flex gap-2 items-center">
              <button
                :disabled="loading"
                @click="
                  handleQuantityChange({
                    idCart: cart._id,
                    quantity: cart.quantity - 1,
                    quantityInStock: cart.quantityInStock + 1,
                  })
                "
                class="border-[1px] py-0.5 px-2 rounded-sm w-8 border-black"
              >
                {{ loading ? "..." : "-" }}
              </button>
              <span class="mx-6">{{ cart.quantity }}</span>
              <button
                :disabled="loading"
                @click="
                  handleQuantityChange({
                    idCart: cart._id,
                    quantity: cart.quantity + 1,
                    quantityInStock: cart.quantityInStock - 1,
                  })
                "
                class="border-[1px] py-0.5 px-2 rounded-sm w-8 border-black"
              >
                {{ loading ? "..." : "+" }}
              </button>
            </div>
            <div
              @click="handleDeleteCart(cart._id)"
              class="p-1 bg-red-600 hover:opacity-80 cursor-pointer rounded-sm hover:bg-red-700"
            >
              <p class="text-center text-sm text-white">Xóa</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Start: Render when not product -->
      <div class="my-4" v-if="carts.length === 0">
        <img
          src="../assets/images/empty-cart.png"
          alt=""
          class="w-96 mx-auto"
        />
        <h1 class="text-center text-2xl text-red-600">
          Không có sản phẩm trong giỏ hàng
        </h1>
        <p class="text-center text-xl">
          Cùng mua sắm hàng ngàn sản phẩm tại YODIShop nhé!
        </p>
        <router-link :to="{ name: 'Product' }" class="text-center">
          <p
            class="text-center capitalize text-white my-2 border rounded py-1.5 bg-red-600"
          >
            Mua hàng
          </p>
        </router-link>
      </div>

      <div class="" v-if="carts.length > 0">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Đơn hàng:</p>
          <p class="font-semibold text-red-600">
            {{
              carts
                .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                .toLocaleString()
            }}
            <u class="no-underline">VND</u>
          </p>
        </div>
        <div class="border-b-2 border-black mb-2"></div>
        <div class="flex">
          <router-link
            to="/checkout"
            class="w-full bg-cyan-600 hover:bg-blue-500 capitalize p-3 rounded-md text-white text-center"
            >Thanh toán</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { ref } from "vue";
import { cartApi } from "@/api/cartApi";
import { receiptApi } from "@/api/receiptApi";

export default {
  setup() {
    // Hooks
    const store = useStore();

    // Handle get cart for user in component Header

    // Ref
    const loading = ref(false);
    // const isPendingSubmiting = ref(false);

    const carts = computed(() => store.getters["carts/cartOrdering"]);
    const user = computed(() => store.state.user.user);

    // Function global
    const handleQuantityChange = async (data) => {
      // data = {idCart:"",quantity:""}
      if (data.quantity === 0) return;
      // Get the cart item
      const cartItem = carts.value.find((cart) => cart._id === data.idCart);
      // Submit data
      loading.value = true;
      if (cartItem.quantity + data.quantity > cartItem.product.quantitySum) {
        alert("Requested quantity exceeds available stock");
        return;
      }
      try {
        // Call api
        await cartApi.editCart(data);
        // Update data in vuex store
        store.dispatch("carts/getCarts");
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    const handleDeleteCart = async (idCart) => {
      if (window.confirm("Bỏ sản phẩm này ra khỏi giỏ hàng?")) {
        loading.value = true;
        try {
          // Call api
          await cartApi.deleteCart(idCart);
          // Update data in vuex store
          store.dispatch("carts/getCarts");
        } catch (err) {
          console.log(err);
        }
        loading.value = false;
      }
    };

    return {
      carts,
      user,
      loading,
      // isPendingSubmiting,
      handleQuantityChange,
      handleDeleteCart,
      //handleOrder,
    };
  },
};
</script>

<style></style>
