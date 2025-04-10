import express from "express";
import AgenteController from "../controllers/agente.controller.js";

const router = express.Router();

router.post("/agente", AgenteController.createAgente);
router.patch("/agente/:id", AgenteController.updateAgente);
router.delete("/agente/:id", AgenteController.deleteAgente);

export default router;