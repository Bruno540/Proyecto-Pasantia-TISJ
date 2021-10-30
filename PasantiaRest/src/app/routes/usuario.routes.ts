import { Router } from "express";
import * as UsuarioController from "../controllers/usuario.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get("/", handleRequest(UsuarioController.getAll));

router.get("/:id", handleRequest(UsuarioController.getById));

router.post("/", handleRequest(UsuarioController.create));

router.put("/:id", handleRequest(UsuarioController.update));

router.delete("/:id", handleRequest(UsuarioController._delete));

export default router;