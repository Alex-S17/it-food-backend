const { model, Schema, SchemaTypes } = require("mongoose");

const orderModel = Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: function () {
        return !this.phone;
      },
    },
    orderNumber: { type: String },
    customerName: {
      type: String,
      required: function () {
        return !this.owner;
      },
      set: (name) => (name === "" ? undefined : name),
    },

    phone: {
      type: String,
      required: function () {
        return !this.owner;
      },
      set: (phone) => (phone === "" ? undefined : phone),
    },
    note: String,
    option: {
      type: String,
      required: [true, "Order option is required"],
      default: "dinein",
    },
    orderedDish: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "dishes",
          required: [true, "Measure is required"],
        },
        quantity: {
          type: String,
          required: [true, "Dish quantity is required"],
        },
        _id: false,
      },
    ],
    totalPrice: String,
    tipAmount: String,
    confirmed: { type: Boolean, default: false },
    totalWithTipsPrice: String,
    giftCoin: Number,

    paymentMethod: {
      type: String,
      enum: ["cash", "mastercard", "visa", "gift"],
      default: "cash",
    },
  },
  { versionKey: false, timestamps: true }
);

const Order = model("order", orderModel);

module.exports = {
  Order,
};
