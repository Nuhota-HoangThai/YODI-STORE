<template>
  <div class="card bg-white my-4 mx-4 rounded-md">
    <div class="cursor-pointer w-full h-full relative group p-2">
      <div
        class="hover:transition-all hover:duration-700 hover:ease-in-out relative"
      >
        <div
          class="absolute w-full h-full bg-black rounded bg-opacity-20 group-hover:block hidden"
        ></div>
        <img
          class="rounded-sm w-full h-[300px] object-cover"
          :src="product.image"
          alt=""
        />
      </div>

      <div class="mt-2 text-center">
        <p class="text-base font-semibold truncate text-black">
          {{ product.title }}
        </p>
      </div>
      <div class="my-2 text-center">
        <span class="ml-2 text-red-600 font-semibold"
          >{{ product.price.toLocaleString() }}
          <u class="no-underline">VND</u></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  setup({ product }, context) {
    return {};
  },
};
</script>

<style></style>
