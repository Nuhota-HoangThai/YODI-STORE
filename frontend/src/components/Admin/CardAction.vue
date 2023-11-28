<template>
  <div class="card">
    <div class="grid grid-cols-4 gap-4">
      <div
        class="hover:transition-all hover:duration-700 hover:ease-in-out relative"
      >
        <img
          class="rounded-md w-[300px] h-[300px]"
          :src="product.image"
          alt=""
        />
      </div>
      <div class="pt-20">
        <div class="my-2">
          <p class="text-base text-black font-semibold truncate">
            {{ product.title }}
          </p>
        </div>
        <div class="my-2 font-medium">
          Giá:
          <span class="text-base text-red-500 font-semibold truncate">
            {{ product.price.toLocaleString() }}
            <u class="no-underline">VND</u>
          </span>
        </div>
        <div class="my-2">
          <p class="text-base text-black font-semibold truncate">
            Số lượng: {{ product.quantitySum }}
          </p>
        </div>
        <div class="flex gap-4">
          <button
            @click="toggleModal(product)"
            class="py-2 flex gap-2 items-center px-2 rounded-md text-white text-sm bg-cyan-800 shadow-lg"
          >
            <span>
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </span>
            <span>Cập nhật</span>
          </button>
          <button
            @click="deleteProduct"
            class="py-2 flex gap-2 items-center px-5 rounded-md text-white text-sm bg-red-800 shadow-lg"
          >
            <span
              ><svg
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
            <span>Xóa</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  setup({ product }, context) {
    const toggleModal = (product) => {
      context.emit("toggle-modal", product);
    };

    const deleteProduct = () => {
      context.emit("delete-product", product._id);
    };

    return { toggleModal, deleteProduct };
  },
};
</script>

<style></style>
