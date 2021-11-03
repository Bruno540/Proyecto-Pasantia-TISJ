import { Router } from "express";
import * as CocheController from "../controllers/coche.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get("/", handleRequest(CocheController.getAll));

router.get("/:id", handleRequest(CocheController.getById));

router.post("/", handleRequest(CocheController.create));

router.put("/:id", handleRequest(CocheController.update));

router.delete("/:id", handleRequest(CocheController._delete));

export default router;