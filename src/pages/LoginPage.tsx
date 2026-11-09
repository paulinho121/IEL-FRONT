import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "./Layout";
import AuthCard from "../components/AuthCard";
import FormField from "../components/FormField";
import FormErrors from "../components/FormErrors";
import { useAuth } from "../contexts/AuthContext";
import { ApiError } from "../services/api";
import { safeRedirect } from "../utils/safeRedirect";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = safeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Quem já está logado não precisa ver o formulário
  if (user && !submitting) return <Navigate to={redirect} replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors([]);
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(redirect, { replace: true });
    } catch (error) {
      setErrors(error instanceof ApiError ? error.messages : ["Não foi possível entrar. Tente novamente."]);
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <AuthCard
        title="Acesse sua conta"
        subtitle={
          <>
            Novo cliente? Então registre-se{" "}
            <Link to={`/cadastro${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary underline">
              aqui
            </Link>
            .
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <FormErrors errors={errors} />
          <FormField
            id="email"
            label="Login *"
            type="email"
            autoComplete="email"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            id="password"
            label="Senha *"
            type="password"
            autoComplete="current-password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={submitting || !email || !password}
            className="mt-2 h-12 rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-tertiary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Entrando..." : "Acessar Conta"}
          </button>
        </form>
      </AuthCard>
    </Layout>
  );
}
