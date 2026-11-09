import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { authApi, type ApiUser, type RegisterData } from "../services/api";

const TOKEN_KEY = "digital-store:token";

interface AuthContextValue {
  user: ApiUser | null;
  /** true enquanto confere um token salvo de uma visita anterior */
  loading: boolean;
  /** Página em que a pessoa clicou em "Sair"; ali uma página protegida manda para a Home, não para o login */
  loggedOutPath: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Lê o id do usuário e a validade de dentro do JWT (sem validar a assinatura, isso é papel da API). */
function decodeToken(token: string): { sub: number; exp: number } | null {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function storeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Navegação privada pode bloquear o localStorage; o login vale só nesta aba
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(() => readStoredToken() !== null);
  const [loggedOutPath, setLoggedOutPath] = useState<string | null>(null);
  const { pathname } = useLocation();

  // Ao navegar para outra página, a marca de "acabou de sair" deixa de valer
  useEffect(() => {
    setLoggedOutPath((path) => (path === pathname ? path : null));
  }, [pathname]);

  /** Guarda o token e busca os dados do usuário dono dele. */
  const startSession = useCallback(async (token: string) => {
    const payload = decodeToken(token);
    if (!payload || payload.exp * 1000 < Date.now()) throw new Error("Sessão expirada");
    const profile = await authApi.getUser(payload.sub);
    storeToken(token);
    setUser(profile);
    setLoggedOutPath(null);
  }, []);

  // Ao abrir o site, retoma a sessão salva se o token ainda for válido
  useEffect(() => {
    const token = readStoredToken();
    if (!token) return;
    startSession(token)
      .catch(() => storeToken(null))
      .finally(() => setLoading(false));
  }, [startSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { token } = await authApi.login(email, password);
      await startSession(token);
    },
    [startSession],
  );

  // Depois do cadastro já entra direto, sem pedir login de novo
  const register = useCallback(
    async (data: RegisterData) => {
      await authApi.register(data);
      await login(data.email, data.password);
    },
    [login],
  );

  const logout = useCallback(() => {
    storeToken(null);
    setUser(null);
    setLoggedOutPath(pathname);
  }, [pathname]);

  const value = useMemo(
    () => ({ user, loading, loggedOutPath, login, register, logout }),
    [user, loading, loggedOutPath, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return context;
}
