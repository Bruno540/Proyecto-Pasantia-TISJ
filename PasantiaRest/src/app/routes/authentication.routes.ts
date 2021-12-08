import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.post("/login", handleRequest(AuthController.login));

router.get("/roles", handleRequest(AuthController.getRoles));

export default router;