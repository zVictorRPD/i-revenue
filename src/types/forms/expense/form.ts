import { removeMask } from "@/utils/mask";
import * as z from "zod";

export const expenseTypes = {
  house: "Moradia",
  transport: "Transporte",
  food: "Alimentação",
  health: "Saúde",
  education: "Educação",
  leisure: "Lazer",
  utilities: "Utilidades",
  insurance: "Seguros",
  childcare: "Creche/Cuidados",
  pets: "Animais de Estimação",
  personal: "Cuidados Pessoais",
  clothing: "Roupas",
  entertainment: "Entretenimento",
  subscriptions: "Assinaturas",
  other: "Outro",
}
export const expenseCycles = {
  monthly: "Mensal",
  yearly: "Anual",
}

export const expenseTypesArray = Object.keys(expenseTypes) as (keyof typeof expenseTypes)[];
export const expenseCyclesArray = Object.keys(expenseCycles) as (keyof typeof expenseCycles)[];

export const expenseFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  type: z.enum(expenseTypesArray, "Selecione um tipo válido."),
  expenseAsRange: z.boolean(),
  min_expense: z.string()
    .transform((val) => parseInt(removeMask(val))).refine((val) => !isNaN(val), "A receita deve ser um número válido.")
    .refine((val) => val >= 0, "A receita deve ser um número positivo."),
  max_expense: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.string()
      .transform((val) => parseInt(removeMask(val)))
      .refine((val) => !isNaN(val), "A receita máxima deve ser um número válido.")
      .refine((val) => val >= 0, "A receita máxima deve ser um número positivo.")
      .optional(),
  ),
  cycle: z.enum(expenseCyclesArray, "Selecione um ciclo válido."),
}).refine((data) => {
  if (data.expenseAsRange && data.max_expense === undefined) {
    return false;
  }
  return true;
}, {
  message: "O campo de receita máxima é obrigatório.",
  path: ["max_expense"],
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;