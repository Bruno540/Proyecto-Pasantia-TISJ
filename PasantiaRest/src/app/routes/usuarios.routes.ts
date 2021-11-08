import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.post("/login", handleRequest(AuthController.login));

export default router;