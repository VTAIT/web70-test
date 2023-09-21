import asyncHandler from "express-async-handler";
import OrderModel from "../models/order.model.js";

// Get all  products
const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 3
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const orders = await OrderModel.aggregate([
    {
      $lookup: {
        from: "inventory",
        localField: "item",
        foreignField: "sku",
        as: "invetory",
      },
    },
    {
      $project: {
        _id: 1,
        item: 1,
        price: 1,
        quantity: 1,
        "invetory.description":1,
      },
    },
  ])

    .skip(skip)
    .limit(size);
  const totalOrders = await OrderModel.countDocuments();
  const totalPages = Math.ceil(totalOrders / size);

  res.json({
    data: orders,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalOrders,
      totalPages,
    },
  });
});

const OrderController = {
  getAllOrders,
};

export default OrderController;
