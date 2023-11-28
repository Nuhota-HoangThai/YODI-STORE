const Cart = require("../models/cart");
const crypto = require("crypto");
const qs = require("qs");
// const cloudinary = require("cloudinary");
const moment = require("moment");
/////////////
const Products = require("../models/product");
//const $ = require("jquery");
const cartControllers = {
  getCart: async (req, res) => {
    try {
      const carts = await Cart.find({
        user: req.userId,
      }).populate("user", [
        "fullName",
        "phone",
        "address",
        "email",
        "createdAt",
      ]);

      return res.status(200).json({
        success: true,
        results: carts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
  addToCart: async (req, res) => {
    const { product, quantity, size, price } = req.body;

    try {
      // Data
      let cart;
      // if (quantity > 10 || quantity < 1) {
      //   return res.status(400).json({
      //     error: "Số lượng phải trong khoản 1 - 10",
      //   });
      // }
      // Check exist => update data
      cart = await Cart.findOne({
        user: req.userId,
        "product._id": product._id,
        ordered: false,
      });

      if (cart) {
        // Check old size
        // Case 1: Same size -> update again quantity, price
        // Case 2: Different size -> create new cart

        // Case 1
        if (cart.size === size) {
          cart = await Cart.findOneAndUpdate(
            { user: req.userId, "product._id": product._id, ordered: false },
            { quantity: cart.quantity + quantity, price },
            { new: true }
          );
        } else {
          // Case 2
          const nCart = new Cart({
            product,
            user: req.userId,
            quantity,
            size,
            price,
          });
          cart = await nCart.save();
        }
      } else {
        // Add product to cart
        const nCart = new Cart({
          product,
          user: req.userId,
          quantity,
          size,
          price,
        });
        cart = await nCart.save();
      }
      return res.status(200).json({
        success: true,
        message: "Add to cart successfully",
        results: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  editToCart: async (req, res) => {
    const { quantity } = req.body;

    try {
      const productUpdate = await Cart.findOneAndUpdate(
        { _id: req.params.id },
        {
          quantity,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Shopping cart updated successfully",
        results: productUpdate,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },
  deleteToCart: async (req, res) => {
    const { id } = req.params;
    try {
      const newData = await Cart.findOneAndDelete({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Product deletion successful",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },

  order: async (req, res) => {
    const orderTime = new Date();

    try {
      // Find all cart items for the user that are not ordered
      const cartItems = await Cart.find({ user: req.userId, ordered: false });

      // Update the quantity in the Products collection
      for (const cartItem of cartItems) {
        const productId = cartItem.product._id;
        const quantityOrdered = cartItem.quantity;

        // Update quantity in the Products collection
        await Products.findByIdAndUpdate(
          productId,
          { $inc: { quantitySum: -quantityOrdered } },
          { new: true }
        );
      }

      // Mark all cart items as ordered
      await Cart.updateMany(
        { user: req.userId, ordered: false },
        { ordered: true, orderTime }
      );

      return res.status(200).json({
        success: true,
        message: "Order Success",
        orderTime,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },
  //////////////////
  ////////

  ////////////////////

  addOrderByVNPay: (req, res) => {
    try {
      console.log(req.body);

      const { price, payment } = req.body;
      var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      var tmnCode = "JL536TD9";
      var secretKey = "LJAZLFTCGAROXGXEXWWRCCTOPUAOIUDZ";
      var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      var returnUrl =
        "http://localhost:5173/order/payment_vnpay_return?price=" +
        price +
        "&payment=" +
        payment;

      const date = new Date();

      const createDate = moment(date).format("YYYYMMDDHHmmss");
      var orderId = moment(date).format("DDHHmmss");
      // var amount = price;
      var bankCode = "NCB";

      //var orderInfo = 'Thanh toan don hang';
      var orderType = "billpayment";
      var locale = "vn";
      if (locale === null || locale === "") {
        locale = "vn";
      }
      var currCode = "VND";
      var vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = "vn";
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId; //
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD: " + orderId;
      vnp_Params["vnp_OrderType"] = orderType;
      vnp_Params["vnp_Amount"] = price * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      ////////////////////////////
      vnp_Params = sortObject(vnp_Params);

      const signData = qs.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

      vnp_Params.vnp_SecureHash = signed;
      vnpUrl += `?${qs.stringify(vnp_Params, { encode: false })}`;
      //res.redirect(vnpUrl);

      ////////////////////////////////

      res.send({
        code: "00",
        vnpUrl,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },

  /////////////
};

///////////
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
///////

module.exports = { cartControllers };
