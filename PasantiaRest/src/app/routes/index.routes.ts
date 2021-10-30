import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";
import AuthRoutes from "./usuarios.routes";

const router = Router();

router.use("/empresas", EmpresasRoutes);

router.use("/authentication", AuthRoutes)

export default router;