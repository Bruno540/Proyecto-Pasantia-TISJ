import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";

const router = Router();

router.use("/empresas", EmpresasRoutes);

export default router;