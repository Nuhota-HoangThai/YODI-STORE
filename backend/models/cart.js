const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = mongoose.Schema(
  {
    product: {
      type: Object,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },

    ordered: {
      type: Boolean,
      default: false,
    },
    ///////////
    payment: {
      type: String,
      enum: ["VNPay", "COD"],
      default: "COD",
      require,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);
module.exports = mongoose.model("carts", CartSchema);
