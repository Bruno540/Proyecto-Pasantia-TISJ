import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";
import UsuariosRoutes from "./usuario.routes";

const router = Router();

router.use("/empresas", EmpresasRoutes);

router.use("/usuarios", UsuariosRoutes);

export default router;