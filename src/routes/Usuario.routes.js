import express from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/usuario", UsuarioController.createUsuario);
router.patch("/usuario/:id", UsuarioController.updateUsuario);
router.delete("/usuario/:id", UsuarioController.deleteUsuario);

export default router;