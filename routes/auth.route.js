import express from "express";
import { loginSchema } from "../validations/login.validation.js";
import AuthController from "../controllers/auth.controller.js";
import { validationMdw } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/login", validationMdw(loginSchema), AuthController.login);


export default router;


