import * as z from "zod";

export const revenueTypes = {
  clt: "CLT",
  pj: "PJ",
  freelance: "Freelance",
  donation: "Doação",
  other: "Outro",
}
export const revenueCycles = {
  monthly: "Mensal",
  yearly: "Anual",
}

export const revenueBenefits = {
  food: "Vale Alimentação",
  health: "Plano de Saúde",
  transport: "Vale Transporte",
  education: "Vale Educação",
  other: "Outro",
}

export const revenueTypesArray = Object.keys(revenueTypes) as (keyof typeof revenueTypes)[];
export const revenueCyclesArray = Object.keys(revenueCycles) as (keyof typeof revenueCycles)[];
export const revenueBenefitsArray = Object.keys(revenueBenefits) as (keyof typeof revenueBenefits)[];

const revenueBenefitSchema = z.object({
  type: z.string()
    .min(1, "Selecione um benefício válido.")
    .refine(
      (value) => revenueBenefitsArray.includes(value as (typeof revenueBenefitsArray)[number]),
      "Campo obrigatório.",
    ),
  value: z.string()
    .min(1, "O valor é obrigatório.")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Formato inválido.")
    .refine((val) => val >= 0, "O valor deve ser positivo."),
});

const revenueTaxesSchema = z.object({
  name: z.string().min(1, "O nome do imposto é obrigatório."),
  value: z.string()
    .min(1, "O valor do imposto é obrigatório.")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Formato inválido.")
    .refine((val) => val >= 0, "O valor do imposto deve ser positivo."),
});

export const revenueFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  type: z.enum(revenueTypesArray, "Selecione um tipo válido."),
  revenueAsRange: z.boolean(),
  min_revenue: z.string()
    .transform((val) => parseFloat(val)).refine((val) => !isNaN(val), "A receita deve ser um número válido.")
    .refine((val) => val >= 0, "A receita deve ser um número positivo."),
  max_revenue: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.string()
      .transform((val) => parseFloat(val))
      .refine((val) => !isNaN(val), "A receita máxima deve ser um número válido.")
      .refine((val) => val >= 0, "A receita máxima deve ser um número positivo.")
      .optional(),
  ),
  cycle: z.enum(revenueCyclesArray, "Selecione um ciclo válido."),
  benefits: z.array(revenueBenefitSchema),
  taxes: z.array(revenueTaxesSchema),
}).refine((data) => {
  if (data.revenueAsRange && data.max_revenue === undefined) {
    return false;
  }
  return true;
}, {
  message: "O campo de receita máxima é obrigatório.",
  path: ["max_revenue"],
});

export type RevenueFormData = z.infer<typeof revenueFormSchema>;