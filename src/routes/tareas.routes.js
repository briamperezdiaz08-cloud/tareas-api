import { Router } from "express";
import {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareas.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/tareas", verificarToken, obtenerTareas);
router.get("/tareas/:id", verificarToken, obtenerTareaPorId);
router.post("/tareas", verificarToken, crearTarea);
router.put("/tareas/:id", verificarToken, actualizarTarea);
router.delete("/tareas/:id", verificarToken, eliminarTarea);

export default router;