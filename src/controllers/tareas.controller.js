let tareas = [
    { id: 1, titulo: "Aprender Express", completada: false },
    { id: 2, titulo: "Practicar Git", completada: true },
];

// GET /tareas - listar todas
export const obtenerTareas = (req, res) => {
    res.json(tareas);
};

// GET /tareas/:id - obtener una tarea específica
export const obtenerTareaPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(tarea);
};

// POST /tareas - crear una tarea nueva
export const crearTarea = (req, res) => {
    const { titulo } = req.body;

    if (!titulo) {
    return res.status(400).json({ mensaje: "El título es obligatorio" });
    }

    const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    completada: false,
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
};

// PUT /tareas/:id - actualizar una tarea
export const actualizarTarea = (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    const { titulo, completada } = req.body;

    if (titulo !== undefined) tarea.titulo = titulo;
    if (completada !== undefined) tarea.completada = completada;

    res.json(tarea);
};

// DELETE /tareas/:id - eliminar una tarea
export const eliminarTarea = (req, res) => {
    const id = parseInt(req.params.id);
    const existe = tareas.some((t) => t.id === id);

    if (!existe) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    tareas = tareas.filter((t) => t.id !== id);
    res.status(204).send();
};