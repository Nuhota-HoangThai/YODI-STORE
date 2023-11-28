<template>
  <div
    class="bg-gradient-to-r from-slate-200 from-10% via-slate-300 via-30% to-slate-200 to-90% px-28"
  >
    <h1 class="text-black font-medium pt-3">Thanh toán</h1>
    <div class="grid grid-cols-6 gap-4 py-2">
      <form class="col-span-3 bg-sky-300 p-3 rounded">
        <div>
          <div
            class="flex flex-col rounded-lg bg-white sm:flex-row"
            v-for="cart in carts"
            :key="cart._id"
          >
            <img
              class="m-2 h-24 w-28 rounded-md border object-cover object-center"
              :src="cart.product.image"
              alt=""
            />
            <div class="flex w-full flex-col px-4 py-4">
              <span class="font-semibold">{{ cart.product.title }}</span>
              <span class="float-right text-gray-400"
                >Số lượng: {{ cart.quantity }}</span
              >
              <p class="text-lg font-bold text-red-600">
                {{ (cart.price * cart.quantity).toLocaleString() }}
                <u class="no-underline">VND</u>
              </p>
            </div>
          </div>
        </div>
        <!---->
        <div class="select-none bg-white p-4">
          <h2 class="text-xl font-medium">Phương thức thanh toán</h2>
          <div class="flex flex-col px-6 py-2">
            <div>
              <input
                type="radio"
                value="COD"
                name="payment"
                id="payment"
                class="peer hidden"
                @click="payment = 'COD'"
              />
              <label
                for="payment"
                class="block cursor-pointer p-2 peer-checked:bg-blue-500"
                ><i class="fa-solid fa-truck-fast text-gray-400"></i> Thanh toán
                khi nhận hàng</label
              >
            </div>
            <div>
              <input
                type="radio"
                value="VNPay"
                name="payment"
                id="VNPay"
                class="peer hidden"
                @click="payment = 'VNPay'"
              />
              <label
                for="VNPay"
                class="block cursor-pointer p-2 peer-checked:bg-blue-500"
                ><i class="fa-solid fa-credit-card text-gray-400"></i> Thanh
                toán qua VNPay</label
              >
            </div>

            <!--
            <div v-if="payment === 'VNPay'">
              <Field
                as="select"
                name="bankcode"
                class="block w-full bg-gray-100 p-2 shadow-md"
              >
                <option value="">Chọn ngân hàng</option>
                <option
                  v-for="item in bc"
                  :key="item.id"
                  :value="item.value"
                  class="font-light"
                >
                  {{ item.title }}
                </option>
              </Field>
            </div>-->
            <!---->
          </div>
        </div>
        <!---->
      </form>
      <div class="col-span-3 bg-slate-300 p-3 rounded">
        <div v-if="user">
          <div class="flex">
            <strong class="pr-3 font-semibold">Tên người nhận:</strong>
            <span class="capitalize text-black font-extrabold pr-6">
              {{ user.fullName }}
            </span>
            <button class="" @click="handleEditInfo('fullName')">
              <p class="text-blue-800">Thay đổi</p>
            </button>
          </div>

          <div class="flex">
            <strong class="pr-3 font-semibold">Số điện thoại:</strong>
            <span class="capitalize text-black font-extrabold pr-6">
              {{ user.phone }}
            </span>
            <button class="" @click="handleEditInfo('phone')">
              <p class="text-blue-800">Thay đổi</p>
            </button>
          </div>

          <div class="flex">
            <strong class="pr-3 font-semibold">Địa chỉ nhận hàng:</strong>
            <span class="capitalize text-black font-extrabold pr-6">
              {{ user.address }}
            </span>
            <button class="" @click="handleEditInfo('address')">
              <p class="text-blue-800">Thay đổi</p>
            </button>
          </div>
        </div>
        <div class="border-b-2 border-black"></div>
        <div class="pt-3">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Tạm tính:</p>
            <p class="font-semibold text-red-600">
              {{
                carts
                  .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                  .toLocaleString()
              }}
              <u class="no-underline">VND</u>
            </p>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Phí vận chuyển:</p>
            <p class="font-semibold text-red-600">
              30,000 <u class="no-underline">VND</u>
            </p>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Tổng tiền:</p>
            <p class="text-2xl font-semibold text-red-600">
              {{ totalPrice.toLocaleString() }} <u class="no-underline">VND</u>
            </p>
          </div>
          <button
            class="mt-4 mb-8 w-full rounded-md bg-gray-500 px-6 py-3 font-medium text-white hover:bg-gray-900"
            :disabled="isPendingSubmiting"
            @click="handleOrder"
          >
            {{ !isPendingSubmiting ? "Đặt hàng" : "Loading..." }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi } from "@/api/authApi";
import { computed } from "@vue/reactivity";
import { ACCESS_TOKEN_WEB_YODI_SHOP } from "@/utils/settingSystem";
import { useStore } from "vuex";
import { ref } from "vue";
import { cartApi } from "@/api/cartApi";
import { receiptApi } from "@/api/receiptApi";
import { useRouter } from "vue-router";
////////
//import { bankcode as bc } from "@/assets/data";
/////////
export default {
  setup() {
    // Hooks
    const store = useStore();
    const router = useRouter();
    //cua tui
    const user = computed(() => store.state.user.user);

    const handleEditInfo = async (field) => {
      let newValue = prompt("Nhập thông tin mới");
      if (!newValue) return;
      try {
        // Call api

        // Cần phải cập nhật lại cái accesstoken mới vì thông tin người dùng sau khi cập nhật sẽ được lưu trong access token mới
        const { user, accessToken } = await authApi.updateProfile({
          [field]: newValue,
        });

        localStorage.setItem(ACCESS_TOKEN_WEB_YODI_SHOP, accessToken);

        // Get again data
        store.commit("user/setUser", user);
      } catch (err) {
        console.log(err);
      }
    };
    //ket cua tui

    // Ref
    const loading = ref(false);
    const isPendingSubmiting = ref(false);
    const payment = ref("COD");

    const carts = computed(() => store.getters["carts/cartOrdering"]);
    const totalPrice = computed(
      () =>
        carts.value.reduce((acc, cur) => acc + cur.price * cur.quantity, 30000)
      // .toLocaleString()
    );

    // console.log(totalPrice);

    //const user = computed(() => store.state.user.user);
    //total
    // const subPrice = ref(0);
    // carts.value.map((product) => {
    //   subPrice += product.price * product.quantity;
    // });
    // const total = ref(subPrice.value + 30000);

    // Function global
    const handleQuantityChange = async (data) => {
      // data = {idCart:"",quantity:""}
      if (data.quantity === 0) return;
      // Submit data
      loading.value = true;
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

    const handleOrder = async () => {
      if (window.confirm("Xác nhận đơn hàng?") && payment.value === "COD") {
        isPendingSubmiting.value = true;
        try {
          // Call api order
          await cartApi.order();

          // Call api add receipt
          await receiptApi.addReceipt({ carts: carts.value });

          // Update data in vuex store
          store.dispatch("carts/getCarts");
          //push home
          router.push({ name: "VnpayReturn" });
        } catch (err) {
          console.log(err);
        }
        isPendingSubmiting.value = false;
      }
      if (window.confirm("Xác nhận đơn hàng?") && payment.value === "VNPay") {
        isPendingSubmiting.value = true;
        try {
          await cartApi.order();

          await cartApi.addOrderVNPay({
            price: totalPrice.value,
            payment: "VNPay",
          });
          // await receiptApi.addReceipt({ carts: carts.value });
          // store.dispatch("carts/getCarts");
        } catch (err) {
          console.log(err);
        }
        isPendingSubmiting.value = false;
      }
      /////////////////
    };
    ////////////////

    ///////////
    return {
      carts,
      // user,
      totalPrice,
      payment,
      user,
      handleEditInfo,
      //
      // subPrice,
      // total,
      loading,
      isPendingSubmiting,
      handleQuantityChange,
      handleDeleteCart,
      handleOrder,

      //

      //
    };
  },
};
</script>

<style></style>
