import { Router } from "express";
import * as DaysController from "../controllers/days.controller";
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get("/", handleRequest(DaysController.getAll));

router.get("/:id", handleRequest(DaysController.getById));

router.post("/", handleRequest(DaysController.create));

router.put("/:id", handleRequest(DaysController.update));

router.delete("/:id", handleRequest(DaysController._delete));

export default router;