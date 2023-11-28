<template>
  <div class="my-4 background mx-auto rounded-md">
    <div class="container bg-white mx-auto px-8 w-[55%] h-full bg-opacity-10">
      <h1
        class="text-center text-2xl font-semibold uppercase pt-4 text-slate-200"
      >
        <font-awesome-icon icon="fa-solid fa-user-plus " />
        ĐĂNG KÝ
      </h1>
      <!-- Start: Form -->
      <form @submit.prevent="handleSubmit" class="pt-4">
        <div class="row flex gap-4">
          <label class="flex flex-col basis-1/2" for="fullname">
            <span class="font-semibold text-slate-200">Họ và tên:</span>
            <input
              v-model="fullName"
              id="fullname"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="text"
              placeholder="Nguyen Hoang Thai"
            />
            <span
              v-if="errors.fullName"
              class="font-semibold text-red-500 mt-2"
              >{{ errors.fullName }}</span
            >
          </label>
          <label class="flex flex-col basis-1/2" for="phone">
            <span class="font-semibold text-slate-200">SĐT:</span>
            <input
              v-model="phone"
              id="phone"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="text"
              placeholder="0123456789"
            />
            <span v-if="errors.phone" class="font-semibold text-red-500 mt-2">{{
              errors.phone
            }}</span>
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="email">
            <span class="font-semibold text-slate-200">Địa chỉ:</span>
            <input
              v-model="address"
              id="address"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="text"
              placeholder="Long Xuyen City"
            />
            <span
              v-if="errors.address"
              class="font-semibold text-red-500 mt-2"
              >{{ errors.address }}</span
            >
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="email">
            <span class="font-semibold text-slate-200">Email:</span>
            <input
              v-model="email"
              id="email"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="email"
              placeholder="yodishop@gmail.com"
            />
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="password">
            <span class="font-semibold text-slate-200">Mật khẩu:</span>
            <input
              v-model="password"
              autocomplete="on"
              id="password"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="password"
              placeholder="Mật khẩu"
            />
            <span
              v-if="errors.password"
              class="font-semibold text-red-500 mt-2"
              >{{ errors.password }}</span
            >
          </label>
        </div>
        <div class="row">
          <!-- Start: Error -->
          <h1
            v-if="statusResponse.message"
            class="text-center mb-4"
            :class="statusResponse.success ? 'text-green-500' : 'text-red-500'"
          >
            {{ statusResponse.message }}
          </h1>
        </div>
        <!-- Start: Submit -->
        <div class="row pt-5">
          <button
            :disabled="loading"
            class="py-3 text-center text-white bg-cyan-800 hover:bg-gray-600 font-bold rounded-lg w-full"
            type="submit"
          >
            {{ !loading ? "Đăng ký" : "Loading..." }}
          </button>
        </div>
      </form>

      <!-- Start: Direction -->
      <div class="w-full text-center pb-7">
        <span class="text-slate-300">Đã có tài khoản. </span>
        <span>
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="text-primary font-bold text-slate-100"
            >Đăng nhập</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { authApi } from "@/api/authApi";
import { useRouter } from "vue-router";

import {
  validateFullName,
  validatePhone,
  validateAddress,
  validatePassword,
} from "@/utils/validateForm";

export default {
  setup() {
    const router = useRouter();
    // Data
    const fullName = ref("");
    const phone = ref("");
    const address = ref("");
    const email = ref("");
    const password = ref("");

    // status before submiting
    const errors = ref({
      fullName: "",
      phone: "",
      address: "",
      password: "",
    });
    // Status before call api
    const loading = ref(false);
    // status after calling api
    const statusResponse = ref({
      success: false,
      message: "",
    });

    // Func global
    const handleSubmit = async () => {
      // Data
      let data = {
        fullName: fullName.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
        password: password.value,
      };

      // Simple validate
      if (
        !fullName.value ||
        !phone.value ||
        !address.value ||
        !email.value ||
        !password.value
      )
        return alert("Vui lòng nhập đầy đủ thông tin");

      // Validate detail field
      const errFullName = validateFullName(fullName.value);
      const errPhone = validatePhone(phone.value);
      const errAdress = validateAddress(address.value);
      const errPassword = validatePassword(password.value);
      errors.value.fullName = errFullName;
      errors.value.phone = errPhone;
      errors.value.address = errAdress;
      errors.value.password = errPassword;

      if (errFullName || errPhone || errAdress || errPassword) return;

      // Submit data
      try {
        loading.value = true;
        // Call api
        const user = await authApi.register(data);

        router.push({ name: "Login" });
        // Info
        statusResponse.value.success = true;
        statusResponse.value.message = "Đăng kí người dùng thành công";
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }
      loading.value = false;
    };
    return {
      // Data binding
      fullName,
      phone,
      address,
      email,
      password,

      // Status
      loading,
      statusResponse,

      // Validate
      errors,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.background {
  height: 560px;
  width: 1000px;
  background-repeat: no-repeat;
  background-image: url("@/assets/images/signup.jpg");
}
</style>
