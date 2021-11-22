import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes";
import path from "path";

/* ---------------------------------------< APP CONFIGURATION >--------------------------------------- */

const app = express();

// Se almacena le valor del puerto a utilizar.
app.set("port", process.env.PORT || 3000);

/* ------------------------------------------< MIDDLEWARES >------------------------------------------ */

// Permite que la aplicación se comunique con otros servidores.
app.use(cors());

// Provee un logger de peticiones.
app.use(morgan("dev"));

// Permite que la aplicación entienda el formato json.
app.use(express.json());

/* ---------------------------------------------< ROUTES >--------------------------------------------- */

// Rutas de la aplicacion.
app.use("/api", routes);

app.use('/uploads', express.static(path.resolve('uploads')));

export default app;

export const baseDir = __dirname;