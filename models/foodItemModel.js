const { model, Schema } = require("mongoose");

const foodItemSchema = Schema({
  title: String,
  category: String,
  area: String,
  description: String,
  thumb: String,
  preview: String,
  price: String,
});

const FoodItem = model("fd", foodItemSchema);

module.exports = {
  FoodItem,
};
