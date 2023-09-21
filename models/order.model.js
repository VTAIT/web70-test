import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
