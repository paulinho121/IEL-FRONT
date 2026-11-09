// Cliente HTTP da API da Digital Store (repositório IEL-BACK)

/** Endereço da API. Em produção vem da variável VITE_API_URL configurada na Vercel. */
export const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3333").replace(/\/$/, "");

/** Erro devolvido pela API, já com as mensagens prontas para exibir. */
export class ApiError extends Error {
  status: number;
  messages: string[];

  constructor(status: number, message: string, messages: string[] = []) {
    super(message);
    this.status = status;
    this.messages = messages.length ? messages : [message];
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
}

export async function apiRequest<T>(path: string, { method = "GET", body, token }: RequestOptions = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique se a API está no ar.");
  }

  // 204 No Content não tem corpo
  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, data?.message ?? "Algo deu errado. Tente novamente.", data?.errors);
  }
  return data as T;
}

export interface ApiUser {
  id: number;
  firstname: string;
  surname: string;
  email: string;
}

export interface RegisterData {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authApi = {
  register: (data: RegisterData) => apiRequest<ApiUser>("/v1/user", { method: "POST", body: data }),
  login: (email: string, password: string) =>
    apiRequest<{ token: string }>("/v1/user/token", { method: "POST", body: { email, password } }),
  getUser: (id: number) => apiRequest<ApiUser>(`/v1/user/${id}`),
};
