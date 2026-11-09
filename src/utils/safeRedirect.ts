/** Só aceita caminhos internos (ex.: /meus-pedidos), para o ?redirect= não levar a outro site. */
export function safeRedirect(value: string | null, fallback = "/") {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
