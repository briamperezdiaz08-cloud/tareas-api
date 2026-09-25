import express from "express";
import tareasRoutes from "./routes/tareas.routes.js";

const app = express();
const PUERTO = 3000;

app.use(express.json());
app.use("/", tareasRoutes);

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});