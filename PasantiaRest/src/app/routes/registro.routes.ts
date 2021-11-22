import { Router } from "express";
import * as RegistroController from "../controllers/registro.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get("/", handleRequest(RegistroController.getAll));

router.get("/:id", handleRequest(RegistroController.getById));

router.post("/", handleRequest(RegistroController.create));

router.put("/:id", handleRequest(RegistroController.update));

router.delete("/:id", handleRequest(RegistroController._delete));

export default router;