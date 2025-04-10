import { z } from "zod";

// --- SCHEMAS ---

const PaymentSchema = z.object({
  data: z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg), z.date({ message: 'Data inválida' })),
  recibo: z.number({ message: 'Recibo inválido' }).min(1),
  valor: z.number({ message: 'Valor inválido' }).min(0),
  observacao: z.string().optional(),
});

const HistoricoStatusSchema = z.object({
  id_ocorrencia: z.number({ message: 'ID da ocorrência inválido' }).min(1),
  status_anterior: z.enum(['Aberta', 'Em andamento', 'Resolvida'], { message: 'Status anterior inválido' }),
  status_novo: z.enum(['Aberta', 'Em andamento', 'Resolvida'], { message: 'Status novo inválido' }),
  data_alteracao: z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg), z.date({ message: 'Data de alteração inválida' })),
  id_agente: z.number({ message: 'ID do agente inválido' }).min(1),
});

// --- CONTROLLERS ---

const PaymentController = {
  async createPayment(req, res) {
    try {
      const validated = PaymentSchema.parse(req.body);
      return res.status(201).json({ message: 'Payment created', dataReq: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", details: error.errors });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updatePayment(req, res) {
    const { id } = req.params;
    try {
      const validated = PaymentSchema.parse(req.body);
      return res.status(200).json({ message: 'Payment updated', id, dataReq: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", details: error.errors });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deletePayment(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Payment deleted', id });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

const HistoricoStatusController = {
  async createHistorico(req, res) {
    try {
      const validated = HistoricoStatusSchema.parse(req.body);
      return res.status(201).json({ message: 'Histórico criado com sucesso', data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async updateHistorico(req, res) {
    const { id } = req.params;
    try {
      const validated = HistoricoStatusSchema.parse(req.body);
      return res.status(200).json({ message: 'Histórico atualizado com sucesso', id, data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async deleteHistorico(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Histórico deletado com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};

export { PaymentController, HistoricoStatusController };