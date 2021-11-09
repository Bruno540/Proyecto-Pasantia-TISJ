import { Router } from "express";
import * as TurnoController from "../controllers/turno.controller"
import { handleRequest } from "../middlewares/error.middleware";

const router = Router();

router.get('/', handleRequest(TurnoController.get));

router.get('/:id', handleRequest(TurnoController.getById));

router.post('/', handleRequest(TurnoController.post));

export default router;