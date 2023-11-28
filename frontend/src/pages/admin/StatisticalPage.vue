<template>
  <div class="grid grid-cols-3 mt-5">
    <div class="col-span-1">
      <div class="mb-8 pl-4">
        <h2 class="text-2xl mb-4 font-semibold">Đơn hàng được xác nhận</h2>
        <div v-if="confirmedOrders.length === 0">
          Không có đơn hàng nào được xác nhận.
        </div>
        <div v-else>
          <div
            class="p-2 border rounded-md mt-4"
            v-for="receipt in confirmedOrders"
            :key="receipt._id"
          >
            <div
              class="flex justify-between w-full my-4"
              v-for="cart in receipt.carts"
              :key="cart._id"
            >
              <div class="flex gap-4">
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
                    <span class="text-gray-600">Số lượng: </span>
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
          </div>
        </div>
      </div>
    </div>
    <!--
      <div>
        <h1 class="text-2xl font-semibold mb-4">Order Statistics</h1>
  
     
        <div>
          <h2 class="text-xl font-semibold mb-4">Deleted Orders</h2>
          <div v-if="deletedOrders.length === 0">No deleted orders.</div>
          <div v-else>
            <div
              class="p-2 border rounded-md mt-4"
              v-for="receipt in deletedOrders"
              :key="receipt._id"
            >
            
              <div class="border-b">
                <h1 class="font-semibold pb-2">
                  <span class="text-gray-500">Full Name:</span>
                  {{ receipt.user.fullName }}
                </h1>
                <h1 class="font-semibold pb-2">
                  <span class="text-gray-500">Address:</span>
                  {{ receipt.user.address }}
                </h1>
                <h1 class="font-semibold pb-2">
                  <span class="text-gray-500">Phone:</span>
                  {{ receipt.user.phone }}
                </h1>
              </div>
  
              
              <div
                class="flex justify-between w-full my-4"
                v-for="cart in receipt.carts"
                :key="cart._id"
              >
                <div class="flex gap-4">
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
                      <span class="text-gray-600">Quantity : </span>
                      {{ cart.quantity }}
                    </p>
                    <p class="text-coffee-600 text-sm my-2">
                      <span class="text-gray-600">Size : </span> {{ cart.size }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-base text-red-500">
                    {{ cart.price.toLocaleString() }} VND
                  </p>
                </div>
              </div>
  
             
              <div class="border-t py-4">
                <div class="">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    -->
    <div class="mb-8 ml-4 col-span-2">
      <h2 class="text-2xl font-semibold mb-4">Thống kê</h2>
      <div v-if="confirmedOrders.length === 0">
        Không có đơn hàng nào được xác nhận.
      </div>
      <div v-else>
        <button
          @click="exportToExcel"
          class="border-2 bg-green-700 text-white p-2"
        >
          Xuất file Excel
        </button>

        <table class="p-2 border rounded-md mt-4">
          <thead>
            <tr class="border-2 border-black font-bold">
              <th class="border-2 border-black p-2">Tên sản phẩm</th>
              <th class="border-2 border-black p-2 text-center">
                Số lượng bán được
              </th>
              <th class="border-2 border-black p-2 text-right">Tổng tiền</th>
              <th class="border-2 border-black p-2 text-center">
                Số lượng tồn kho
              </th>
            </tr>
          </thead>
          <tbody class="border-2 border-black">
            <tr
              v-for="(productTotal, productName) in productTotals"
              :key="productName"
            >
              <td class="border-2 border-black p-2">{{ productName }}</td>
              <td class="border-2 border-black p-2 text-center">
                {{ productTotal.totalQuantity }}
              </td>
              <td class="border-2 border-black p-2 text-right">
                {{ productTotal.totalPrice.toLocaleString() }}
                <u class="text-red-600 no-underline">VND</u>
              </td>
              <td class="border-2 border-black p-2 text-center">
                {{ productTotal.remainingQuantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import * as XLSX from "xlsx";

export default {
  setup() {
    const store = useStore();

    const calculateRemainingQuantity = () => {
      const remainingQuantities = {};
      //////////
      confirmedOrders.value.forEach((receipt) => {
        receipt.carts.forEach((cart) => {
          const productName = cart.product.title;

          if (!remainingQuantities[productName]) {
            remainingQuantities[productName] =
              cart.product.quantitySum - cart.quantity;
          } else {
            remainingQuantities[productName] -= cart.quantity;
          }
        });
      });

      return remainingQuantities;
    }; ///////////
    const confirmedOrders = computed(() =>
      store.state.receipts.receipts.filter((receipt) => receipt.checked)
    );

    const productTotals = computed(() => {
      const totals = {};

      confirmedOrders.value.forEach((receipt) => {
        receipt.carts.forEach((cart) => {
          const productName = cart.product.title;

          if (!totals[productName]) {
            totals[productName] = {
              totalQuantity: cart.quantity,
              totalPrice: cart.price,
              remainingQuantity: 0, // Khởi tạo giá trị số lượng còn lại
            };
          } else {
            totals[productName].totalQuantity += cart.quantity;
            totals[productName].totalPrice += cart.price;
          }
        });
      });

      const remainingQuantities = calculateRemainingQuantity();

      // Cập nhật thông tin số lượng còn lại từ đối tượng remainingQuantities
      Object.keys(totals).forEach((productName) => {
        if (remainingQuantities[productName] !== undefined) {
          totals[productName].remainingQuantity =
            remainingQuantities[productName];
        }
      });

      return totals;
    });
    const exportToExcel = () => {
      const data = [];

      Object.entries(productTotals.value).forEach(
        ([productName, productTotal]) => {
          const row = {
            "Product Name": productName,
            "Total Quantity": productTotal.totalQuantity,
            "Total Price": productTotal.totalPrice,
          };

          data.push(row);
        }
      );

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "ConfirmedOrders");

      XLSX.writeFile(wb, "ConfirmedOrders.xlsx");
    };
    return {
      confirmedOrders,
      //deletedOrders,
      productTotals,
      exportToExcel,
    };
  },
};
</script>

<style></style>
