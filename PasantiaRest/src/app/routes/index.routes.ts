import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";
import UsuariosRoutes from "./usuario.routes";
import CochesRoutes from "./coche.routes";
import TurnosRoutes from "./turno.routes";

const router = Router();

router.use("/empresas", EmpresasRoutes);

router.use("/usuarios", UsuariosRoutes);

router.use("/coches", CochesRoutes);

router.use("/turnos", TurnosRoutes);

export default router;