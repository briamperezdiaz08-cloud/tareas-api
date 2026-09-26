import express from "express";
import tareasRoutes from "./routes/tareas.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PUERTO = 3000;

app.use(express.json());
app.use("/", tareasRoutes);
app.use("/", authRoutes);

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});