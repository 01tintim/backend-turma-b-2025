import { z } from "zod";

// --- SCHEMAS ---

const PaymentSchema = z.object({
  data: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({ message: 'Data inválida' })),
  recibo: z.number({ message: 'Recibo inválido' }).min(1, { message: 'Recibo inválido' }),
  valor: z.number({ message: 'Valor invalido' }).min(0, { message: 'Valor inválido' }),
  observacao: z.string().optional(),
});

const OcorrenciaSchema = z.object({
  titulo: z.string().min(1, { message: 'Título é obrigatório' }),
  descricao: z.string().min(1, { message: 'Descrição é obrigatória' }),
  id_categoria: z.number({ message: 'Categoria inválida' }).min(1),
  id_usuario: z.number({ message: 'Usuário inválido' }).min(1),
  status: z.enum(['Aberta', 'Em andamento', 'Resolvida'], { message: 'Status inválido' }),
  data_registro: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({ message: 'Data de registro inválida' })),
  localizacao: z.string().min(1, { message: 'Localização é obrigatória' }),
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

const OcorrenciaController = {
  async createOcorrencia(req, res) {
    try {
      const validated = OcorrenciaSchema.parse(req.body);
      return res.status(201).json({ message: 'Ocorrência criada com sucesso', data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async updateOcorrencia(req, res) {
    const { id } = req.params;
    try {
      const validated = OcorrenciaSchema.parse(req.body);
      return res.status(200).json({ message: 'Ocorrência atualizada com sucesso', id, data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async deleteOcorrencia(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Ocorrência deletada com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};

export { PaymentController, OcorrenciaController };