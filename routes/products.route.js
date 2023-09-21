import express from "express";
import ProductController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/all", ProductController.getAllProducts);
router.get("/low_quantity", ProductController.getLowQuantityProducts);


export default router;
