import { Router } from "express";
import * as RegistroController from "../controllers/registro.controller";
import { handleRequest } from "../middlewares/error.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

const router = Router();

router.get("/", handleRequest(RegistroController.getAll));

router.get("/tools/ultimos", handleRequest(RegistroController.findUltimos));

router.get("/:id", handleRequest(RegistroController.getById));

router.post("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(RegistroController.create));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(RegistroController.update));

router.delete("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(RegistroController._delete));

router.get('/sse/stablish',handleRequest(RegistroController.sseStablish));

export default router;