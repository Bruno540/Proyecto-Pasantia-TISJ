import { Router } from "express";
import * as EmpresaController from "../controllers/empresa.controller";
import { handleRequest } from "../middlewares/error.middleware";
import { empresaStorage } from "../libraries/file.library"; 
import multer from "multer";

const router = Router();

const upload = multer({storage:empresaStorage()});

router.get("/", handleRequest(EmpresaController.getAll));

router.get("/coches/:id", handleRequest(EmpresaController.getCoches));

router.get("/:id", handleRequest(EmpresaController.getById));

router.post("/", upload.single("imagen"),handleRequest(EmpresaController.create));

router.put("/:id",upload.single("imagen"), handleRequest(EmpresaController.update));

router.delete("/:id", handleRequest(EmpresaController._delete));

export default router;