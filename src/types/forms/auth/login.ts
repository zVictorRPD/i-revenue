import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email("Insira um e-mail válido."),
  password: z.string().min(8, "A senha deve conter pelo menos 8 caracteres."),
});