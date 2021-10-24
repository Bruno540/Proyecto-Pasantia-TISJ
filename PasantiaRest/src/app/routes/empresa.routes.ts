import { Router } from "express";
import * as EmpresaController from "../controllers/empresa.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get("/", handleRequest(EmpresaController.getAll));

router.get("/:id", handleRequest(EmpresaController.getById));

router.post("/", handleRequest(EmpresaController.create));

router.put("/:id", handleRequest(EmpresaController.update));

router.delete("/:id", handleRequest(EmpresaController._delete));

export default router;