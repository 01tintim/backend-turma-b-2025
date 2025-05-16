import { z } from "zod";

// --- SCHEMAS ---

const PaymentSchema = z.object({
  data: z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg), z.date({ message: 'Data inválida' })),
  recibo: z.number({ message: 'Recibo inválido' }).min(1),
  valor: z.number({ message: 'Valor inválido' }).min(0),
  observacao: z.string().optional(),
});

const AgenteSchema = z.object({
  id_usuario: z.number({ message: 'ID do usuário inválido' }).min(1),
  cargo: z.string({ message: 'Cargo é obrigatório' }).min(1, { message: 'Cargo não pode ser vazio' }),
});

// --- C ---

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

const AgenteController = {
  async createAgente(req, res) {
    try {
      const validated = AgenteSchema.parse(req.body);
      return res.status(201).json({ message: 'Agente criado com sucesso', data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async updateAgente(req, res) {
    const { id } = req.params;
    try {
      const validated = AgenteSchema.parse(req.body);
      return res.status(200).json({ message: 'Agente atualizado com sucesso', id, data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async deleteAgente(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Agente deletado com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};

export { PaymentController, AgenteController };