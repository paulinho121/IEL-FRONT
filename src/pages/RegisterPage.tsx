import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "./Layout";
import AuthCard from "../components/AuthCard";
import FormField from "../components/FormField";
import FormErrors from "../components/FormErrors";
import { useAuth } from "../contexts/AuthContext";
import { ApiError, type RegisterData } from "../services/api";
import { safeRedirect } from "../utils/safeRedirect";

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm: RegisterData = { firstname: "", surname: "", email: "", password: "", confirmPassword: "" };

/** Mesmas regras da API, conferidas antes de enviar para dar retorno imediato. */
function validate(form: RegisterData) {
  const errors: string[] = [];
  if (!form.firstname.trim()) errors.push("Informe seu nome.");
  if (!form.surname.trim()) errors.push("Informe seu sobrenome.");
  if (!EMAIL_REGEX.test(form.email.trim())) errors.push("Informe um e-mail válido.");
  if (form.password.length < MIN_PASSWORD_LENGTH) errors.push(`A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
  else if (form.password !== form.confirmPassword) errors.push("A confirmação de senha não confere.");
  return errors;
}

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = safeRedirect(searchParams.get("redirect"));

  const [form, setForm] = useState<RegisterData>(emptyForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  if (user && !submitting) return <Navigate to={redirect} replace />;

  const update = (field: keyof RegisterData) => (event: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const localErrors = validate(form);
    setErrors(localErrors);
    if (localErrors.length) return;

    setSubmitting(true);
    try {
      await register({ ...form, firstname: form.firstname.trim(), surname: form.surname.trim(), email: form.email.trim() });
      navigate(redirect, { replace: true });
    } catch (error) {
      setErrors(error instanceof ApiError ? error.messages : ["Não foi possível concluir o cadastro. Tente novamente."]);
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <AuthCard
        title="Crie sua conta"
        subtitle={
          <>
            Já possui uma conta? Entre{" "}
            <Link to={`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary underline">
              aqui
            </Link>
            .
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <FormErrors errors={errors} />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="firstname" label="Nome *" autoComplete="given-name" placeholder="Insira seu nome" value={form.firstname} onChange={update("firstname")} required />
            <FormField id="surname" label="Sobrenome *" autoComplete="family-name" placeholder="Insira seu sobrenome" value={form.surname} onChange={update("surname")} required />
          </div>
          <FormField id="email" label="E-mail *" type="email" autoComplete="email" placeholder="Insira seu e-mail" value={form.email} onChange={update("email")} required />
          <FormField
            id="password"
            label="Senha *"
            type="password"
            autoComplete="new-password"
            placeholder={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres`}
            value={form.password}
            onChange={update("password")}
            required
          />
          <FormField
            id="confirmPassword"
            label="Confirme a senha *"
            type="password"
            autoComplete="new-password"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-12 rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-tertiary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>
      </AuthCard>
    </Layout>
  );
}
