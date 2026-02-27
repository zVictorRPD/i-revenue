import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormData } from "@/types/forms/auth/login";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleMutationError, post } from "@/utils/api";
import type { User } from "@/types/user";
import { useUserStore } from "@/storage/user";

export function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (payload: LoginFormData) => {
      return await post<User>("/auth/login", payload);
    },
    onSuccess: (data) => {
      setUser(data.data);
      toast.success("Login bem-sucedido!");
    },
    onError: (error) => {
      const message = handleMutationError(error);
      toast.error(message);
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <FieldGroup>
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
          <FieldError>{errors.password?.message}</FieldError>
        </Field>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" loading={mutation.isPending}>
              Fazer Login
            </Button>
            <FieldDescription className="px-6 text-center mt-2!">
              Não tem uma conta? <Link to="/cadastro">Criar Conta</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
