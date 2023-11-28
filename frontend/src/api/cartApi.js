import { configHeader } from "@/utils/settingSystem";
import axiosClient from "../utils/axiosClient";

export const cartApi = {
  addToCart: async (data) => {
    console.log(data);
    // Config header
    const config = configHeader();
    const { results } = await axiosClient.post("/cart", data, config);
    return results;
  },

  getCart: async () => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.get("/cart", config);

    return results;
  },

  editCart: async (data) => {
    // data = {idCart:"",quantity:""}
    const { idCart, quantity, quantityInStock } = data;
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.patch(
      `/cart/${idCart}`,
      { quantity, quantityInStock },
      config
    );

    return results;
  },

  deleteCart: async (idCart) => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.delete(`/cart/${idCart}`, config);

    return results;
  },

  order: async () => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.get("/cart/order", config);

    return results;
  },

  ///////////////////
  addOrderVNPay: async ({ price, payment }) => {
    try {
      const config = configHeader();
      const res = await axiosClient.post(
        "/cart/payment_vnpay_url",
        { price, payment },
        config
      );
      console.log({ res });
      window.location.href = res.vnpUrl;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
