const { model, Schema, SchemaTypes, default: mongoose } = require("mongoose");

const orderModel = Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: function () {
        return !this.phone;
      },
    },
    customerName: {
      type: String,
      required: false,
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
    dishes: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "dish",
        },
        quantity: {
          type: String,
          required: [true, "Dish quantity is required"],
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Order = model("order", orderModel);

module.exports = {
  Order,
};
