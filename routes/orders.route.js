import express from "express";
import OrderController from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/all", OrderController.getAllOrders);



export default router;
