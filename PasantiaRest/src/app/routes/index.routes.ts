import { Router } from "express";
import EmpresasRoutes from "./empresa.routes";
import AuthRoutes from "./usuarios.routes";
import UsuariosRoutes from "./usuario.routes";
import CochesRoutes from "./coche.routes";
import DiasEspecialesRoutes from "./dias-especiales.routes";
import TurnosRoutes from "./turno.routes";
import RegistroRoutes from "./registro.routes";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

router.use("/empresas", EmpresasRoutes);

router.use("/authentication", AuthRoutes);

router.use("/usuarios", UsuariosRoutes);

router.use("/dias-especiales", [isLoggedIn, tieneRol(["Administrador"])], DiasEspecialesRoutes);

router.use("/coches", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], CochesRoutes);

router.use("/turnos", TurnosRoutes);

router.use("/registros", RegistroRoutes);

export default router;