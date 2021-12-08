import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";
import UsuariosRoutes from "./usuario.routes";
import AuthRoutes from "./authentication.routes";
import CochesRoutes from "./coche.routes";
import DiasEspecialesRoutes from "./dias-especiales.routes";
import TurnosRoutes from "./turno.routes";
import RegistroRoutes from "./registro.routes";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

const router = Router();

router.use("/empresas", [isLoggedIn, tieneRol(["Administrador"])], EmpresasRoutes);

router.use("/authentication", AuthRoutes);

router.use("/usuarios", [isLoggedIn, tieneRol(["Administrador"])], UsuariosRoutes);

router.use("/dias-especiales", [isLoggedIn, tieneRol(["Administrador"])], DiasEspecialesRoutes);

router.use("/coches", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], CochesRoutes);

router.use("/turnos", TurnosRoutes);

router.use("/registros", RegistroRoutes);

export default router;