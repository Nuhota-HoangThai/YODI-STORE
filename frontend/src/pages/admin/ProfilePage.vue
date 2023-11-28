<template>
  <div
    class="bg-gradient-to-r from-slate-200 from-10% via-slate-300 via-30% to-slate-200 to-90%"
  >
    <div class="container mx-auto py-6" v-if="user">
      <div class="">
        <h1 class="text-center capitalize text-2xl text-black">
          THÔNG TIN CỦA BẠN
        </h1>
        <div class="border-b-2 border-black mb-4 mt-2"></div>

        <!---->
        <table class="border-black border-2 text-center">
          <tr class="border font-bold">
            <th class="border-2 border-black p-3 w-96">Họ tên</th>
            <th class="border-2 border-black p-3 w-96">Địa chỉ</th>
            <th class="border-2 border-black p-3 w-96">Email</th>
            <th class="border-2 border-black p-3 w-96">SĐT</th>
          </tr>
          <tr class="border">
            <td class="border-2 border-black p-3">{{ user.fullName }}</td>
            <td class="border-2 border-black p-3">{{ user.address }}</td>
            <td class="border-2 border-black p-3">{{ user.email }}</td>
            <td class="border-2 border-black p-3">{{ user.phone }}</td>
          </tr>
          <tr class="border text-blue-900">
            <td class="border-2 border-black p-3">
              <button
                class="border bg-teal-500 py-1 px-2 rounded w-40"
                @click="handleEditInfo('fullName')"
              >
                Thay đổi Họ tên
              </button>
            </td>
            <td class="border-2 border-black p-3">
              <button
                class="border bg-teal-500 py-1 px-2 rounded w-40"
                @click="handleEditInfo('address')"
              >
                Thay đổi địa chỉ
              </button>
            </td>
            <td class="border-2 border-black p-3">
              <button
                class="border bg-teal-500 py-1 px-2 rounded w-40"
                @click="handleEditInfo('email')"
              >
                Thay đổi email
              </button>
            </td>
            <td class="border-2 border-black p-3">
              <button
                class="border bg-teal-500 py-1 px-2 rounded w-40"
                @click="handleEditInfo('phone')"
              >
                Thay đổi SĐT
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi } from "@/api/authApi";
import { ACCESS_TOKEN_WEB_YODI_SHOP } from "@/utils/settingSystem";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user.user);

    const handleEditInfo = async (field) => {
      let newValue = prompt("Nhập thông tin chỉnh sửa tại đây");
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

    return { user, handleEditInfo };
  },
};
</script>

<style></style>
