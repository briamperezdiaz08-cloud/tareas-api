import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// POST /auth/registro
export const registrarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const resultado = await pool.query(
      "INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING id, email, creado_en",
      [email, passwordEncriptada]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ mensaje: "Ese email ya está registrado" });
    }
    res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
    }

    const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const usuario = resultado.rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};