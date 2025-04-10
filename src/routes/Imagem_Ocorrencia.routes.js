import express from "express";
import ImagemOcorrenciaController from "../controllers/imagem.controller.js";

const router = express.Router();

router.post("/imagem", ImagemOcorrenciaController.createImagem);
router.patch("/imagem/:id", ImagemOcorrenciaController.updateImagem);
router.delete("/imagem/:id", ImagemOcorrenciaController.deleteImagem);

export default router;