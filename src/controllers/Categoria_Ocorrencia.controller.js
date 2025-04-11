import { z } from "zod";

// Payment validation schema
const PaymentSchema = z.object({
  data: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({ message: 'Data inválida' })),
  recibo: z.number({ message: 'Recibo inválido' }).min(1, { message: 'Recibo inválido' }),
  valor: z.number({ message: 'Valor invalido' }).min(0, { message: 'Valor inválido' }),
  observacao: z.string().optional(),
});

// Categoria_Ocorrencia validation schema
const CategoriaOcorrenciaSchema = z.object({
  descricao: z.string().min(1, { message: 'Obrigatório esse campo' }),
});

const PaymentController = {
  async createPayment(req, res) {
    try {
      const validated = PaymentSchema.parse(req.body);
      return res.status(201).json({
        message: 'Payment created',
        dataReq: validated,
      });
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
      return res.status(200).json({
        message: 'Payment updated',
        id,
        dataReq: validated,
      });
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

const CategoriaOcorrenciaController = {
  async createCategoria(req, res) {
    try {
      const validated = CategoriaOcorrenciaSchema.parse(req.body);
      return res.status(201).json({
        message: 'Categoria criada com sucesso',
        data: validated,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async updateCategoria(req, res) {
    const { id } = req.params;
    try {
      const validated = CategoriaOcorrenciaSchema.parse(req.body);
      return res.status(200).json({
        message: 'Categoria atualizada com sucesso',
        id,
        data: validated,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async deleteCategoria(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Categoria deletada com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};

export { PaymentController, CategoriaOcorrenciaController };