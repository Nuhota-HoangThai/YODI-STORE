<template>
  <div class="my-8 grid grid-cols-5 background mx-auto rounded-md">
    <div class="col-span-3"></div>
    <div
      class="container col-span-2 mx-auto px-8 w-full h-full bg-white bg-opacity-60"
    >
      <h1 class="text-2xl font-semibold mt-5 text-black text-center uppercase">
        <font-awesome-icon icon="fa-solid fa-user" /> Đăng nhập
      </h1>
      <!-- Start: Form -->
      <form @submit.prevent="handleSubmit" class="mt-8">
        <div class="row">
          <label class="flex flex-col mb-2" for="email">
            <span class="font-semibold text-black">Email:</span>
            <input
              v-model="email"
              id="email"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="email"
              placeholder="Nhập email của bạn?"
            />
          </label>
        </div>
        <div class="row mt-4">
          <label class="flex flex-col mb-3" for="password">
            <span class="font-semibold text-black">Mật khẩu:</span>
            <input
              v-model="password"
              autocomplete="on"
              id="password"
              class="px-4 py-2 rounded-lg border border-gray-500 mt-1"
              type="password"
              placeholder="Mật khẩu"
            />
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
        <div class="row mt-10">
          <div class="row">
            <button
              :disabled="loading"
              class="py-3 text-center text-white bg-cyan-800 hover:bg-gray-600 font-bold rounded-lg w-full"
              type="submit"
            >
              {{ !loading ? "Đăng nhập" : "Loading..." }}
            </button>
          </div>
        </div>
      </form>

      <!-- Start: Direction -->
      <div class="w-full text-center mt-6 mb-3">
        <span class="text-black">Tạo tài khoản mới. </span>
        <span>
          <router-link
            :to="{ name: 'Register', params: {} }"
            class="text-primary font-bold text-black"
            >Đăng ký</router-link
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
import { ACCESS_TOKEN_WEB_YODI_SHOP } from "@/utils/settingSystem";

export default {
  setup() {
    // Hooks
    const router = useRouter();
    // Data
    const email = ref("");
    const password = ref("");

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
        email: email.value,
        password: password.value,
      };

      // Simple validate
      if (!email.value || !password.value)
        return alert("Vui lòng nhập đầy đủ thông tin");

      // Submit data
      try {
        loading.value = true;
        // Call api
        const { accessToken } = await authApi.login(data);

        // Save accessToken to localStorage
        localStorage.setItem(ACCESS_TOKEN_WEB_YODI_SHOP, accessToken);

        // Navigate to home page
        router.push({ name: "Home" });

        // Info
        statusResponse.value.success = true;
        statusResponse.value.message = "Đăng nhập thành công";
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }
      loading.value = false;
    };
    return {
      // Data binding
      email,
      password,

      // Status
      loading,
      statusResponse,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.background {
  height: 400px;
  width: 1200px;
  background-repeat: no-repeat;
  background-image: url("@/assets/images/bannerlg.jpg");
}
</style>
