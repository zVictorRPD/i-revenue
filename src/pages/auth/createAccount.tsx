import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createAccountFormSchema, type CreateAccountFormData } from "@/types/forms/auth/createAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

export function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountFormSchema),
  });


  const mutation = useMutation({
    mutationFn: async (data: CreateAccountFormData) => {
      await new Promise((resolve, reject) => setTimeout(() => {
        return Math.random() > 0.5 ? resolve(undefined) : reject(new Error("Erro de criação de conta simulado"))
      }, 1000));
      console.log(data);
    },
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Ocorreu um erro ao criar a conta.");
      console.error(error);
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Insira seu nome"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Insira seu e-mail"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Insira sua senha"
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {!errors.password ?
            (
              <FieldDescription>
                Deve conter pelo menos 8 caracteres.
              </FieldDescription>
            ) : (
              <FieldError>{errors.password?.message}</FieldError>
            )
          }
        </Field>
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirm-password">
            Confirmar Senha
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirme sua senha"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </Field>
        <FieldGroup className="mt-4">
          <Field>
            <Button
              type="submit"
              loading={mutation.isPending}
            >
              Criar Conta
            </Button>
            <FieldDescription className="px-6 text-center mt-2!">
              Já tem uma conta? <Link to="/login">Login</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  )
}