import { Router } from "express";
import * as TurnoController from "../controllers/turno.controller"
import { handleRequest } from "../middlewares/error.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

const router = Router();

router.get('/tipos', handleRequest(TurnoController.getTipos));

router.get('/', [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(TurnoController.get));

router.get('/filtered', handleRequest(TurnoController.getTurnosFiltered));

router.get('/:id', [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(TurnoController.getById));

router.get('/tools/proximos', handleRequest(TurnoController.getProximos));

router.get('/tools/live', handleRequest(TurnoController.getTurnosLive));

router.post('/', [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(TurnoController.post));

router.put('/:id', [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(TurnoController.put));

router.delete('/:id', [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(TurnoController._delete));

export default router;