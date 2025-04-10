import express from "express";
import CategoriaOcorrenciaController from "../controllers/categoria.controller.js";

const router = express.Router();

router.post("/categoria", CategoriaOcorrenciaController.createCategoria);
router.patch("/categoria/:id", CategoriaOcorrenciaController.updateCategoria);
router.delete("/categoria/:id", CategoriaOcorrenciaController.deleteCategoria);

export default router;