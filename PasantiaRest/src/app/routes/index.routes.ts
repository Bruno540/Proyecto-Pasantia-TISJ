import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";
import AuthRoutes from "./usuarios.routes";
import UsuariosRoutes from "./usuario.routes";
import CochesRoutes from "./coche.routes";

const router = Router();

router.use("/empresas", EmpresasRoutes);

router.use("/authentication", AuthRoutes)
router.use("/usuarios", UsuariosRoutes);

router.use("/coches", CochesRoutes);

export default router;