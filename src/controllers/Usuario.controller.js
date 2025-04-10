import { z } from "zod";

const PaymentSchema = z.object({
  data: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({ message: 'Data inválida' })),
  recibo: z.number({ message: 'Recibo inválido' }).min(1, { message: 'Recibo inválido' }),
  valor: z.number({ message: 'Valor invalido' }).min(0, { message: 'Valor inválido' }),
  observacao: z.string().optional(),
});

const UsuarioSchema = z.object({
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  cpf: z.string().length(14, { message: 'CPF inválido (formato esperado: xxx.xxx.xxx-xx)' }),
  telefone: z.string().min(10, { message: 'Telefone inválido' }),
  email: z.string().email({ message: 'Email inválido' }),
  endereco: z.string().min(1, { message: 'Endereço é obrigatório' }),
  senha: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  tipo: z.enum(['Usuario', 'Agente', 'Admin'], { message: 'Tipo inválido' }),
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

const UsuarioController = {
  async createUsuario(req, res) {
    try {
      const validated = UsuarioSchema.parse(req.body);
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        data: validated,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async updateUsuario(req, res) {
    const { id } = req.params;
    try {
      const validated = UsuarioSchema.parse(req.body);
      return res.status(200).json({
        message: 'Usuário atualizado com sucesso',
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

  async deleteUsuario(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ message: 'Usuário deletado com sucesso', id });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};

export { PaymentController, UsuarioController };