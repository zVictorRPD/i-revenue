import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { expenseCycles, expenseTypes } from "@/types/forms/expense/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseFormSchema,
  type ExpenseFormData,
} from "@/types/forms/expense/form";
import { Controller, useForm } from "react-hook-form";
import { maskInputMoney } from "@/utils/mask";
import type { Expense } from "@/types/expense";
import { useMemo } from "react";
import type { z } from "zod";

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  expense?: Expense | null;
}

type ExpenseFormInput = z.input<typeof expenseFormSchema>;

export function ExpenseForm({ onSubmit, expense }: ExpenseFormProps) {
  const defaultValues = useMemo(
    () => ({
      name: expense?.name ?? "",
      type: expense?.type || undefined,
      expenseAsRange:
        expense?.max_expense !== null && expense?.max_expense !== undefined,
      min_expense:
        expense?.min_expense !== undefined ? String(expense.min_expense) : "",
      max_expense:
        expense?.max_expense !== null && expense?.max_expense !== undefined
          ? String(expense.max_expense)
          : "",
      cycle: expense?.cycle || undefined,
      benefits:
        expense?.benefits?.map((benefit) => ({
          type: benefit.type,
          value: String(benefit.value),
        })) ?? [],
      taxes:
        expense?.taxes?.map((tax) => ({
          name: tax.name,
          value: String(tax.value),
        })) ?? [],
    }),
    [expense],
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    shouldUnregister: true,
    defaultValues,
  });

  const expenseAsRange = watch("expenseAsRange");

  return (
    <form id="expense-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            placeholder="Insira o nome"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="type">Tipo</FieldLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="type" aria-invalid={!!errors.type}>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(expenseTypes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{errors.type?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="min_expense" className="bg-transparent!">
            Despesa
            <div className="flex items-center space-x-2 ml-auto">
              <Controller
                name="expenseAsRange"
                control={control}
                render={({ field }) => (
                  <Switch
                    size="sm"
                    id="expenseAsRange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="expenseAsRange">Despesa como intervalo</Label>
            </div>
          </FieldLabel>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="min_expense"
              control={control}
              render={({ field }) => (
                <Input
                  id="min_expense"
                  placeholder="Insira a despesa"
                  {...field}
                  onChange={field.onChange}
                  value={maskInputMoney(String(field.value))}
                  className={!expenseAsRange ? "col-span-2" : ""}
                  aria-invalid={!!errors.min_expense}
                />
              )}
            />
            {expenseAsRange && (
              <Controller
                name="max_expense"
                control={control}
                render={({ field }) => (
                  <Input
                    id="max_expense"
                    placeholder="Insira a despesa máxima"
                    {...field}
                    onChange={field.onChange}
                    value={maskInputMoney(String(field.value))}
                    aria-invalid={!!errors.max_expense}
                  />
                )}
              />
            )}
          </div>
          <FieldError>
            {errors.min_expense?.message || errors.max_expense?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel>Ciclo</FieldLabel>
          <Controller
            name="cycle"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                aria-invalid={!!errors.cycle}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ciclo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(expenseCycles).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{errors.cycle?.message}</FieldError>
        </Field>
      </FieldGroup>
    </form>
  );
}
