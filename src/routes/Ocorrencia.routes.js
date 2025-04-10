import express from "express";
import OcorrenciaController from "../controllers/ocorrencia.controller.js";

const router = express.Router();

router.post("/ocorrencia", OcorrenciaController.createOcorrencia);
router.patch("/ocorrencia/:id", OcorrenciaController.updateOcorrencia);
router.delete("/ocorrencia/:id", OcorrenciaController.deleteOcorrencia);

export default router;