import pool from "../config/db.js";
import Log from "../models/Log.js";

// GET /tareas - listar todas
export const obtenerTareas = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM tareas ORDER BY id");
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las tareas", error: error.message });
  }
};

// GET /tareas/:id - obtener una tarea específica
export const obtenerTareaPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const resultado = await pool.query("SELECT * FROM tareas WHERE id = $1", [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la tarea", error: error.message });
  }
};

// POST /tareas - crear una tarea nueva
export const crearTarea = async (req, res) => {
  try {
    const { titulo } = req.body;

    if (!titulo) {
      return res.status(400).json({ mensaje: "El título es obligatorio" });
    }

    const resultado = await pool.query(
      "INSERT INTO tareas (titulo) VALUES ($1) RETURNING *",
      [titulo]
    );

    const nuevaTarea = resultado.rows[0];

    await Log.create({
      tareaId: nuevaTarea.id,
      accion: "creada",
      detalle: `Tarea "${nuevaTarea.titulo}" creada por usuario ${req.usuario.email}`,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la tarea", error: error.message });
  }
};

// PUT /tareas/:id - actualizar una tarea
export const actualizarTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, completada } = req.body;

    const resultado = await pool.query(
      "UPDATE tareas SET titulo = COALESCE($1, titulo), completada = COALESCE($2, completada) WHERE id = $3 RETURNING *",
      [titulo, completada, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    const tareaActualizada = resultado.rows[0];

    await Log.create({
      tareaId: tareaActualizada.id,
      accion: "actualizada",
      detalle: `Tarea actualizada por usuario ${req.usuario.email}`,
    });

    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la tarea", error: error.message });
  }
};

// DELETE /tareas/:id - eliminar una tarea
export const eliminarTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const resultado = await pool.query("DELETE FROM tareas WHERE id = $1 RETURNING *", [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    await Log.create({
      tareaId: id,
      accion: "eliminada",
      detalle: `Tarea eliminada por usuario ${req.usuario.email}`,
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la tarea", error: error.message });
  }
};