import { Router } from "express";
import { login, registrarUsuario } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/registro", registrarUsuario);
router.post("/auth/login", login)

export default router;