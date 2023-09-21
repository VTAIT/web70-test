import express from "express";
import authRouter from "./auth.route.js";
import productRouter from "./products.route.js";
import orderRouter from "./orders.route.js";

const router = express.Router();


router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);


export default router;
