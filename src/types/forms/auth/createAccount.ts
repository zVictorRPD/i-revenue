import * as z from "zod";

export const createAccountFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.email("Insira um e-mail válido."),
  password: z.string().min(8, "A senha deve conter pelo menos 8 caracteres."),
  confirmPassword: z.string().min(8, "A confirmação de senha deve conter pelo menos 8 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});