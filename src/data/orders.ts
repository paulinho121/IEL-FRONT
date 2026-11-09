// Pedidos de exemplo da página "Meus Pedidos" (a loja ainda não tem login nem checkout)
export type OrderStatus = "transito" | "entregue" | "cancelado";

export interface Order {
  number: string;
  date: string; // ISO (AAAA-MM-DD)
  status: OrderStatus;
  items: { productId: number; quantity: number; size: string }[];
  shipping: number;
}

export const orderStatus: Record<OrderStatus, { label: string; className: string }> = {
  transito: { label: "Produto em trânsito", className: "bg-warning/15 text-[#a8700a]" },
  entregue: { label: "Entregue", className: "bg-success/15 text-[#2c8a49]" },
  cancelado: { label: "Cancelado", className: "bg-error/15 text-error" },
};

export const orders: Order[] = [
  {
    number: "1234567890",
    date: "2026-11-05",
    status: "transito",
    items: [
      { productId: 2, quantity: 1, size: "41" },
      { productId: 1, quantity: 2, size: "40" },
    ],
    shipping: 0,
  },
  {
    number: "1234567812",
    date: "2026-10-18",
    status: "entregue",
    items: [{ productId: 4, quantity: 1, size: "37" }],
    shipping: 19.9,
  },
  {
    number: "1234567799",
    date: "2026-09-30",
    status: "cancelado",
    items: [{ productId: 7, quantity: 1, size: "42" }],
    shipping: 24.9,
  },
  {
    number: "1234567701",
    date: "2026-08-12",
    status: "entregue",
    items: [
      { productId: 3, quantity: 1, size: "42" },
      { productId: 13, quantity: 1, size: "42" },
    ],
    shipping: 0,
  },
];
