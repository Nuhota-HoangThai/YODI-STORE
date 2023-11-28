<template>
  <main class="mb-8">
    <div class="mt-4 px-4 sm:px-8">
      <div class="container max-w-4xl mx-auto px-8">
        <h1
          class="text-center text-2xl sm:text-3xl font-semibold capitalize mb-4 sm:mb-6"
        >
          Đơn hàng
        </h1>
        <div
          class="p-2 border rounded-md mt-4 sm:mt-6"
          v-for="receipt in receipts"
          :key="receipt._id"
        >
          <!-- Info -->
          <div class="border-b">
            <h5 class="font-semibold text-base sm:text-lg pb-2">
              <span class="text-gray-500">Họ tên:</span>
              {{ receipt.user.fullName }}
            </h5>
            <h5 class="font-semibold pb-2">
              <span class="text-gray-500">Địa chỉ:</span>
              {{ receipt.user.address }}
            </h5>
            <h5 class="font-semibold pb-2">
              <span class="text-gray-500">SĐT:</span>
              {{ receipt.user.phone }}
            </h5>
          </div>
          <div
            class="flex justify-between w-full my-4"
            v-for="cart in receipt.carts"
            :key="cart._id"
          >
            <!-- Info -->
            <div class="flex gap-4 sm:gap-8">
              <div class="w-[100px] h-[100px] rounded-md overflow-hidden">
                <img
                  class="w-full h-full object-cover"
                  :src="cart.product.image"
                  alt=""
                />
              </div>

              <div class="">
                <h1 class="text-base font-semibold">
                  {{ cart.product.title }}
                </h1>
                <p class="text-coffee-600 text-sm my-2">
                  <span class="text-gray-600">Số lượng : </span>
                  {{ cart.quantity }}
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-base text-red-500">
                {{ cart.price.toLocaleString() }} VND
              </p>
            </div>
          </div>
          <p class="text-base">
            Tổng tiền:
            <span class="text-red-600 font-bold"
              >{{ calculateTotal(receipt.carts) }} VND</span
            >
          </p>
          <!-- Action -->
          <div class="border-t py-4">
            <div class="">
              <button
                @click="handleConfirm(receipt._id)"
                :style="{ background: `${receipt.checked ? '#ccc' : ''}` }"
                :disabled="loading || receipt.checked"
                class="bg-green-500 px-3 py-1 text-sm sm:px-4 sm:py-2 text-white rounded-sm mr-2 sm:mr-4 hover:opacity-80"
              >
                {{ !loading ? "Xác nhận" : "Loading..." }}
              </button>
              <button
                @click="handleDelete(receipt._id)"
                :disabled="loading || receipt.checked"
                class="bg-red-500 px-4 py-1 text-sm text-white rounded-sm hover:opacity-80"
              >
                {{ !loading ? "Xóa" : "Loading..." }}
              </button>
              <button
                @click="exportToPDF(receipt)"
                class="bg-blue-500 mx-3 px-2 py-1 text-sm text-white rounded-sm hover:opacity-80"
              >
                Xuất file PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { receiptApi } from "@/api/receiptApi";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ref } from "vue";
//////////
import html2pdf from "html2pdf.js";
/////////
export default {
  setup() {
    // Hooks
    const store = useStore();

    // Ref
    const loading = ref(false);

    // Data
    const receipts = computed(() => store.state.receipts.receipts);

    // Actions
    store.dispatch("receipts/getReceipts");

    // Func global
    const handleConfirm = async (idReceipt) => {
      // Submit data
      try {
        loading.value = true;
        if (window.confirm("You definitely confirm this order?")) {
          // Call api
          await receiptApi.confirmReceipt(idReceipt);

          // Get again data
          store.dispatch("receipts/getReceipts");

          alert("Order confirmation successful");
        }
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    const handleDelete = async (idReceipt) => {
      // Submit data
      try {
        loading.value = true;
        const receipt = receipts.value.find(
          (receipt) => receipt._id === idReceipt
        );

        // Check if the order is confirmed
        if (receipt.checked) {
          alert("Cannot delete a confirmed order.");
        } else {
          if (window.confirm("You confirm delete cart?")) {
            // Call api
            await receiptApi.deleteReceipt(idReceipt);

            // Get again data
            store.dispatch("receipts/getReceipts");

            alert("Delete successfully");
          }
        }
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    return {
      // Data
      receipts,

      loading,

      // Func
      handleConfirm,
      handleDelete,
    };
  },
  components: {},

  methods: {
    generateReceiptContent(receipt) {
      const total = this.calculateTotal(receipt.carts);
      return `
        <div class="border-b">
          <h5 class="font-semibold pb-2">
            <span class="text-gray-500">Họ tên:</span>
            ${receipt.user.fullName}
          </h5>
          <h5 class="font-semibold pb-2">
            <span class="text-gray-500">Địa chỉ:</span>
            ${receipt.user.address}
          </h5>
          <h5 class="font-semibold pb-2">
            <span class="text-gray-500">SĐT:</span>
            ${receipt.user.phone}
          </h5>
        </div>
        ${receipt.carts
          .map(
            (cart) => `
              <div class="flex justify-between w-full my-4">
                <div class="flex gap-4">
                  
                  <div>
                    <h1 class="text-base font-semibold">${
                      cart.product.title
                    }</h1>
                    <p class="text-coffee-600 text-sm my-2">
                      <span class="text-gray-600">Số lượng : </span>${
                        cart.quantity
                      }
                    </p>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-base text-red-500">${cart.price.toLocaleString()} VND</p>
                </div>
              </div>
              
            `
          )
          .join("")}
          <p class="text-base">
          Tổng tiền:
          <span class="text-red-600 font-bold">${total} VND</span>
        </p>
      `;
    },
    // Hàm tính tổng tiền của đơn hàng
    calculateTotal(carts) {
      let total = 0;
      // Duyệt qua từng sản phẩm trong đơn hàng và cộng thêm giá tiền vào tổng
      carts.forEach((cart) => {
        total += cart.price + 30000;
      });
      return total.toLocaleString();
    },
    exportToPDF(receipt) {
      // Create an element containing the content you want to export
      const contentElement = document.createElement("div");
      contentElement.innerHTML = this.generateReceiptContent(receipt);

      // Use html2pdf to generate the PDF
      html2pdf(contentElement, {
        margin: 10,
        filename: "receipt.pdf",
        //  image: { type: "jpg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      });
    },
  },
};
</script>

<style></style>
