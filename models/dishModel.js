const { model, Schema } = require("mongoose");

const dishSchema = Schema({
  title: String,
  category: String,
  area: String,
  description: String,
  thumb: String,
  preview: String,
  price: String,
});

const Dish = model("dish", dishSchema);

module.exports = {
  Dish,
};
