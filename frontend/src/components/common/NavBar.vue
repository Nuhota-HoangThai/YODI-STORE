<template>
  <nav class="bg-black">
    <div class="max-w-screen-xl flex flex-wrap items-center px-32 py-2">
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0"
        >
          <li
            :class="pathName === '/' ? 'ct-top-menu-item-active' : ''"
            class=""
          >
            <router-link
              :to="{ name: 'Home', params: {} }"
              class="text-white md:bg-transparent md:p-0 hover:text-yellow-400 hover:font-extrabold hover:border-b-2 hover:border-yellow-400"
              aria-current="page"
              ><font-awesome-icon icon="fa-solid fa-house" /> Trang
              chủ</router-link
            >
          </li>
          <li
            :class="pathName === '/product' ? 'ct-top-menu-item-active' : ''"
            class=""
          >
            <router-link
              :to="{ name: 'Product', params: {} }"
              class="text-white md:bg-transparent md:p-0 hover:text-yellow-400 hover:font-extrabold hover:border-b-2 hover:border-yellow-400 hover:scale-110"
            >
              Đồng hồ</router-link
            >
          </li>
          <li
            :class="pathName === '/product' ? 'ct-top-menu-item-active' : ''"
            class=""
          >
            <router-link
              :to="{ name: 'Product', params: {} }"
              class="text-white md:bg-transparent md:p-0 hover:text-yellow-400 hover:font-extrabold hover:border-b-2 hover:border-yellow-400"
            >
              Smartwatch</router-link
            >
          </li>
          <li
            :class="pathName === '/product' ? 'ct-top-menu-item-active' : ''"
            class=""
          >
            <router-link
              :to="{ name: 'Product', params: {} }"
              class="text-white md:bg-transparent md:p-0 hover:text-yellow-400 hover:font-extrabold hover:border-b-2 hover:border-yellow-400"
            >
              Phụ kiện</router-link
            >
          </li>
          <li
            :class="pathName === '/about' ? 'ct-top-menu-item-active' : ''"
            class=""
          >
            <router-link
              :to="{ name: 'About', params: {} }"
              class="text-white md:bg-transparent md:p-0 hover:text-yellow-400 hover:font-extrabold hover:border-b-2 hover:border-yellow-400"
              >Giới thiệu</router-link
            >
          </li>
          <li
            :class="pathName === '/about' ? 'ct-top-menu-item-active' : ''"
            class=""
          >
            <router-link
              :to="{ name: 'Contact', params: {} }"
              class="text-white md:bg-transparent md:p-0 hover:text-yellow-400 hover:font-extrabold hover:border-b-2 hover:border-yellow-400"
              >Liên hệ</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
