import { Router } from "express";
import * as DiasEspecialesController from "../controllers/dias-especiales.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get("/", handleRequest(DiasEspecialesController.getAll));

router.get("/:id", handleRequest(DiasEspecialesController.getById));

router.post("/", handleRequest(DiasEspecialesController.create));

router.put("/:id", handleRequest(DiasEspecialesController.update));

router.delete("/:id", handleRequest(DiasEspecialesController._delete));

export default router;