import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function RevenueForm() {
  const [revenueAsRange, setRevenueAsRange] = useState(false);
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">Nome</FieldLabel>
        <Input id="name" name="name" placeholder="Insira o nome" />
      </Field>
      <Field>
        <FieldLabel>Tipo</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="clt">CLT</SelectItem>
              <SelectItem value="pj">PJ</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="donation">Doação</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="min_revenue" className="bg-transparent!">
          Receita
          <div className="flex items-center space-x-2 ml-auto">
            <Switch size="sm" id="airplane-mode" checked={revenueAsRange} onCheckedChange={setRevenueAsRange} />
            <Label htmlFor="airplane-mode">Receita como intervalo</Label>
          </div>
        </FieldLabel>
        <div className="grid grid-cols-2 gap-4">
          <Input id="min_revenue" name="min_revenue" placeholder="Insira a receita" className={!revenueAsRange ? "col-span-2" : ""} />
          {revenueAsRange && (<Input id="max_revenue" name="max_revenue" placeholder="Insira a receita máxima" />)}
        </div>
      </Field>
      <Field>
        <FieldLabel>Ciclo</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ciclo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  )
}