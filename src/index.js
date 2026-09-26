import express from "express";
import mongoose from "mongoose";
import tareasRoutes from "./routes/tareas.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PUERTO = 3000;

app.use(express.json());
app.use("/", tareasRoutes);
app.use("/", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error.message));

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});