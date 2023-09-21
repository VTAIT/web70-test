import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instock: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("inventory", ProductSchema);

export default ProductModel;
