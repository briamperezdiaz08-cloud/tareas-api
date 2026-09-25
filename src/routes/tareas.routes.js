import { Router } from "express";
import {
    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/tareas", obtenerTareas);
router.get("/tareas/:id", obtenerTareaPorId);
router.post("/tareas", crearTarea);
router.put("/tareas/:id", actualizarTarea);
router.delete("/tareas/:id", eliminarTarea);

export default router;