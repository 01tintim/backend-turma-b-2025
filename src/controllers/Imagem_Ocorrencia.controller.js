import { z } from "zod";

// --- SCHEMAS ---

const PaymentSchema = z.object({
  data: z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg), z.date({ message: 'Data inválida' })),
  recibo: z.number({ message: 'Recibo inválido' }).min(1),
  valor: z.number({ message: 'Valor inválido' }).min(0),
  observacao: z.string().optional(),
});

const ImagemOcorrenciaSchema = z.object({
  id_ocorrencia: z.number({ message: 'ID da ocorrência inválido' }).min(1),
  id_usuario: z.number({ message: 'ID do usuário inválido' }).min(1),
  url_imagem: z.string({ message: 'URL da imagem é obrigatória' }).url({ message: 'URL inválida' }),
  descricao: z.string().optional(),
  data_upload: z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg), z.date({ message: 'Data de upload inválida' })),
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

const ImagemOcorrenciaController = {
  async createImagem(req, res) {
    try {
      const validated = ImagemOcorrenciaSchema.parse(req.body);
      return res.status(201).json({ message: 'Imagem da ocorrência criada com sucesso', data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async updateImagem(req, res) {
    const { id } = req.params;
    try {
      const validated = ImagemOcorrenciaSchema.parse(req.body);
      return res.status(200).json({ message: 'Imagem da ocorrência atualizada com sucesso', id, data: validated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async deleteImagem(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Imagem da ocorrência deletada com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};

export { PaymentController, ImagemOcorrenciaController };