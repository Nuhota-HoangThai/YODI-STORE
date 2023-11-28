<template>
  <header
    class="px-4 sm:px-6 md:px-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
  >
    <div class="flex items-center relative">
      <div class="logo basis-2/5 text-center cursor-pointer">
        <router-link
          :to="{ name: 'Home', params: {} }"
          class="flex items-center"
        >
          <img class="w-24 h-24" src="../../assets/images/logo.png" alt="" />
          <span class="text-black font-bold text-2xl">YODI STORE</span>
        </router-link>
      </div>
      <!--form search-->
      <ul
        class="basis-full hidden lg:flex lg:items-center lg:justify-end gap-1"
      >
        <li>
          <form @submit.prevent="handleSearch" class="hidden lg:block">
            <div class="row relative">
              <input
                v-model="searchText"
                id="name"
                class="px-4 sm:px-8 h-full bg-white rounded-2xl text-black py-2 border w-full sm:w-80 border-black text-sm focus:ring-gray-800 focus:border-gray-800"
                type="name"
                placeholder="Tìm kiếm sản phẩm"
              />
              <button
                @click="handleSearch"
                class="text-sm px-3 absolute top-[50%] w-12 -translate-y-1/2 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </li>
      </ul>
      <!---->
      <ul
        id="ct-top-menu"
        class="basis-full hidden lg:flex lg:items-center lg:justify-end text-sm text-yellow-50"
      >
        <li class="pr-12 font-bold">
          <div class="flex items-center py-1.5 text-black text-center">
            <font-awesome-icon
              icon="fa-solid fa-phone-volume"
              class="h-5 text-black pl-2"
            />
            <router-link to="/contact" class="px-1 py-1"
              >Hỗ trợ & Tư vấn</router-link
            >
          </div>
          <p class="text-black">0123.345.678 - 0987.123.123</p>
        </li>
        <li class="ct-top-menu-cart pr-2">
          <div
            class="flex items-center py-1.5 text-black"
            @click="navigateCart"
          >
            <div class="flex py-1 px-2">
              <div class="relative">
                <font-awesome-icon
                  icon="fa-solid fa-cart-shopping"
                  class="text-xl"
                />
                <span
                  class="text-red-600 font-bold text-sm absolute -top-3 -right-2 rounded-full bg-white px-1"
                  v-if="quantityCart > 0"
                  >{{ quantityCart }}
                </span>
              </div>
            </div>
          </div>
        </li>
        <li class="ct-top-menu-profile">
          <div
            class="flex items-center py-1.5 text-black text-center"
            v-if="!user"
          >
            <router-link to="/login">
              <span class="text-black text-base px-2">
                <font-awesome-icon
                  icon="fa-solid fa-user-plus"
                  class="w-6 h-6 text-black"
                />
              </span>
            </router-link>
          </div>
          <div class="flex items-center relative group" v-else>
            <span class="mx-1 border-2 rounded-full border-black">
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="w-6 h-6 text-black p-1"
              />
            </span>
            <span
              class="text-black text-base font-semibold"
              v-if="user.role === 'ADMIN'"
              >Quản trị viên</span
            >

            <ul
              class="absolute z-20 w-[200px] bg-slate-100 rounded-md right-[0] top-[100%] overflow-hidden hidden group-hover:block"
            >
              <li
                v-if="user.role === 'ADMIN'"
                class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Admin-receipt', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Quản lý đơn hàng</p>
                </router-link>
              </li>
              <li
                v-if="user.role === 'ADMIN'"
                class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Admin-product', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Quản lý sản phẩm</p>
                </router-link>
              </li>
              <li
                v-if="user.role === 'ADMIN'"
                class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Statistical', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Thống kê doanh thu</p>
                </router-link>
                <hr />
              </li>
              <li
                class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Profile', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Thông tin của bạn</p>
                </router-link>
              </li>

              <li
                v-if="user.role === 'CUSTOMER'"
                class="p-2 px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'History-cart', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Lịch sử đơn hàng</p>
                </router-link>
              </li>
              <li
                @click="handleLogout"
                class="p-2 px-4 hover:bg-red-600 text-gray-600 hover:text-white"
              >
                <p class="capitalize">Đăng xuất</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { ACCESS_TOKEN_WEB_YODI_SHOP } from "@/utils/settingSystem";

import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
export default {
  setup() {
    // hooks
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // ref
    const searchText = ref("");

    const user = computed(() => store.state.user.user);
    const quantityCart = computed(() => {
      let count = 0;
      store.state.carts.carts.forEach((item) => {
        if (!item.ordered) count++;
      });
      return count;
    });

    // Func global
    const handleSearch = () => {
      router.push({
        name: "Product-search",
        query: {
          title: searchText.value,
        },
      });
    };

    // Handle clear search text
    watch(route, () => {
      // When navigate diffrent search page => clear search text
      if (!route.path.includes("search")) {
        searchText.value = "";
      }
    });

    // Handle token when route change login -> homepage
    // Use this way because when auto change route login to home page not re-render same react
    watch(route, () => {
      // Handle token + save info user when route change
      const token = localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP);
      if (token) {
        const { user } = jwt_decode(token);
        store.commit("user/setUser", user);
      }
    });

    // Handle token when route change login -> homepage -> update cart
    watch(route, () => {
      // Handle token + save info user when route change
      const token = localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP);
      if (token) {
        store.dispatch("carts/getCarts");
      } else {
        store.commit("carts/setCarts", []);
      }
    });

    // Handle token when first time to enter web
    const token = localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP);
    if (token) {
      const { user } = jwt_decode(token);
      store.commit("user/setUser", user);
    }

    // Handle get cart of user
    if (token) {
      store.dispatch("carts/getCarts");
    }

    // Logout
    const handleLogout = () => {
      // Clear token
      localStorage.removeItem(ACCESS_TOKEN_WEB_YODI_SHOP);
      store.commit("user/setUser", null);

      router.push("/login");
    };

    // Handle navigate to cart
    const navigateCart = () => {
      const { user } = store.state.user;
      if (!user) return router.push({ name: "Login" });

      router.push({
        name: "Cart",
      });
    };

    return {
      pathName: computed(() => route.path),
      searchText,
      handleSearch,
      handleLogout,
      navigateCart,
      user,
      quantityCart,
    };
  },
};
</script>

<style></style>
