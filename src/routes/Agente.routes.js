import { z } from "zod";

export const UsuarioSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  cpf: z.string().length(14, { message: "CPF deve ter 14 caracteres (formato 000.000.000-00)" }),
  telefone: z.string().min(10, { message: "Telefone inválido" }),
  email: z.string().email({ message: "E-mail inválido" }),
  endereco: z.string().min(1, { message: "Endereço é obrigatório" }),
  senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  tipo: z.enum(["Usuario", "Agente", "Admin"], { message: "Tipo inválido" }),
});