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
import {
  revenueBenefits,
  revenueCycles,
  revenueTypes,
} from "@/types/forms/revenue/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  revenueFormSchema,
  type RevenueFormData,
} from "@/types/forms/revenue/form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { maskInputMoney } from "@/utils/mask";
import type { Revenue } from "@/types/revenue";
import { useMemo } from "react";
import type { z } from "zod";

interface RevenueFormProps {
  onSubmit: (data: RevenueFormData) => void;
  revenue?: Revenue | null;
}

type RevenueFormInput = z.input<typeof revenueFormSchema>;

export function RevenueForm({ onSubmit, revenue }: RevenueFormProps) {
  const defaultValues = useMemo(
    () => ({
      name: revenue?.name ?? "",
      type: revenue?.type || "other",
      revenueAsRange:
        revenue?.max_revenue !== null && revenue?.max_revenue !== undefined,
      min_revenue:
        revenue?.min_revenue !== undefined ? String(revenue.min_revenue) : "",
      max_revenue:
        revenue?.max_revenue !== null && revenue?.max_revenue !== undefined
          ? String(revenue.max_revenue)
          : "",
      cycle: revenue?.cycle || "monthly",
      benefits:
        revenue?.benefits?.map((benefit) => ({
          type: benefit.type,
          value: String(benefit.value),
        })) ?? [],
      taxes:
        revenue?.taxes?.map((tax) => ({
          name: tax.name,
          value: String(tax.value),
        })) ?? [],
    }),
    [revenue],
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RevenueFormInput, unknown, RevenueFormData>({
    resolver: zodResolver(revenueFormSchema),
    shouldUnregister: true,
    defaultValues,
  });

  const {
    fields: benefitsFields,
    append: benefitsAppend,
    remove: benefitsRemove,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  const {
    fields: taxFields,
    append: taxAppend,
    remove: taxRemove,
  } = useFieldArray({
    control,
    name: "taxes",
  });

  const revenueAsRange = watch("revenueAsRange");

  return (
    <form id="revenue-form" onSubmit={handleSubmit(onSubmit)}>
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
                    {Object.entries(revenueTypes).map(([key, value]) => (
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
          <FieldLabel htmlFor="min_revenue" className="bg-transparent!">
            Receita
            <div className="flex items-center space-x-2 ml-auto">
              <Controller
                name="revenueAsRange"
                control={control}
                render={({ field }) => (
                  <Switch
                    size="sm"
                    id="revenueAsRange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="revenueAsRange">Receita como intervalo</Label>
            </div>
          </FieldLabel>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="min_revenue"
              control={control}
              render={({ field }) => (
                <Input
                  id="min_revenue"
                  placeholder="Insira a receita"
                  {...field}
                  onChange={field.onChange}
                  value={maskInputMoney(String(field.value))}
                  className={!revenueAsRange ? "col-span-2" : ""}
                  aria-invalid={!!errors.min_revenue}
                />
              )}
            />
            {revenueAsRange && (
              <Controller
                name="max_revenue"
                control={control}
                render={({ field }) => (
                  <Input
                    id="max_revenue"
                    placeholder="Insira a receita máxima"
                    {...field}
                    onChange={field.onChange}
                    value={maskInputMoney(String(field.value))}
                    aria-invalid={!!errors.max_revenue}
                  />
                )}
              />
            )}
          </div>
          <FieldError>
            {errors.min_revenue?.message || errors.max_revenue?.message}
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
                    {Object.entries(revenueCycles).map(([key, value]) => (
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
      <Separator className="my-6" />

      <div className="flex items-center justify-between mb-3">
        <h4 className="text-md font-medium">Benefícios</h4>
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={() => benefitsAppend({ type: "", value: "" })}
        >
          <PlusIcon />
          Adicionar
        </Button>
      </div>
      <FieldGroup>
        {benefitsFields.map((benefit, index) => (
          <div className="grid grid-cols-[1fr_1fr_40px] gap-4" key={benefit.id}>
            <Field>
              <FieldLabel htmlFor={`benefitType-${benefit.id}`}>
                Benefício
              </FieldLabel>
              <Controller
                name={`benefits.${index}.type`}
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    aria-invalid={!!errors.benefits?.[index]?.type}
                  >
                    <SelectTrigger id={`benefitType-${benefit.id}`}>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(revenueBenefits).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{errors.benefits?.[index]?.type?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor={`benefitValue-${benefit.id}`}>
                Valor
              </FieldLabel>
              <Controller
                name={`benefits.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`benefitValue-${benefit.id}`}
                    placeholder="Insira o valor"
                    {...field}
                    onChange={field.onChange}
                    value={maskInputMoney(String(field.value))}
                    aria-invalid={!!errors.benefits?.[index]?.value}
                  />
                )}
              />
              <FieldError>
                {errors.benefits?.[index]?.value?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel className="opacity-0 select-none">Ações</FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => benefitsRemove(index)}
                aria-label="Remover benefício"
              >
                <TrashIcon />
              </Button>
            </Field>
          </div>
        ))}
      </FieldGroup>
      <Separator className="my-6" />

      <div className="flex items-center justify-between mb-3">
        <h4 className="text-md font-medium">Impostos</h4>
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={() => taxAppend({ name: "", value: "" })}
        >
          <PlusIcon />
          Adicionar
        </Button>
      </div>
      <FieldGroup>
        {taxFields.map((tax, index) => (
          <div className="grid grid-cols-[1fr_1fr_40px] gap-4" key={tax.id}>
            <Field>
              <FieldLabel htmlFor={`taxName-${tax.id}`}>Imposto</FieldLabel>
              <Input
                id={`taxName-${tax.id}`}
                placeholder="Insira o nome"
                {...register(`taxes.${index}.name`)}
                aria-invalid={!!errors.taxes?.[index]?.name}
              />
              <FieldError>{errors.taxes?.[index]?.name?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor={`taxValue-${tax.id}`}>Valor</FieldLabel>
              <Controller
                name={`taxes.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`taxValue-${tax.id}`}
                    placeholder="Insira o valor"
                    {...field}
                    onChange={field.onChange}
                    value={maskInputMoney(String(field.value))}
                    aria-invalid={!!errors.taxes?.[index]?.value}
                  />
                )}
              />
              <FieldError>{errors.taxes?.[index]?.value?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel className="opacity-0 select-none">Ações</FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => taxRemove(index)}
                aria-label="Remover imposto"
              >
                <TrashIcon />
              </Button>
            </Field>
          </div>
        ))}
      </FieldGroup>
    </form>
  );
}
