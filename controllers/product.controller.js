import asyncHandler from "express-async-handler";
import ProductModel from "../models/product.model.js";

// Get all  products
const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 3
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const products = await ProductModel.find();
  const totalProducts = await ProductModel.countDocuments();
  const totalPages = Math.ceil(totalProducts / size);

  res.json({
    data: products,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalProducts,
      totalPages,
    },
  });
});

// Get low quantity products
const getLowQuantityProducts = asyncHandler(async (req, res) => {
  const lowQuantityThreshold = parseInt(req.query.lowQuantityThreshold);
  
  const page = parseInt(req.query.page) || 1; // 3
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const products = await ProductModel.find({instock:{$lt:lowQuantityThreshold}}).skip(skip).limit(size);
  const totalProducts = await ProductModel.countDocuments();
  const totalPages = Math.ceil(totalProducts / size);

  res.json({
    data: products,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalProducts,
      totalPages,
    },
  });
});



const ProductController = {
  getAllProducts,
  getLowQuantityProducts
};

export default ProductController;
