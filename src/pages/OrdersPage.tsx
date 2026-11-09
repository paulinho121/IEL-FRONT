import { useState } from "react";
import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import Layout from "./Layout";
import { finalPrice, getProductById } from "../data/products";
import { orders, orderStatus, type Order, type OrderStatus } from "../data/orders";
import { formatPrice } from "../utils/formatPrice";

type Tab = "todos" | OrderStatus;

const tabs: { value: Tab; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "transito", label: "Em trânsito" },
  { value: "entregue", label: "Entregues" },
  { value: "cancelado", label: "Cancelados" },
];

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

/** Junta os dados do produto em cada item e calcula o total do pedido. */
function describeOrder(order: Order) {
  const items = order.items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ ...item, product, subtotal: finalPrice(product) * item.quantity }] : [];
  });
  const total = items.reduce((sum, item) => sum + item.subtotal, 0) + order.shipping;
  return { items, total };
}

function OrderCard({ order }: { order: Order }) {
  const { items, total } = describeOrder(order);
  const status = orderStatus[order.status];

  return (
    <article className="rounded bg-white p-5 md:p-8">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-light-gray-2 pb-4">
        <div>
          <p className="text-xs text-light-gray">Pedido nº {order.number}</p>
          <p className="mt-1 text-sm text-dark-gray-2">Feito em {formatDate(order.date)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}>{status.label}</span>
      </header>

      <ul className="divide-y divide-light-gray-3">
        {items.map(({ product, quantity, size, subtotal }) => (
          <li key={product.id} className="flex items-center gap-4 py-4">
            <Link to={`/product/${product.id}`} className="shrink-0">
              <img src={product.image} alt="" className="size-[72px] rounded object-cover md:size-[90px]" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                to={`/product/${product.id}`}
                className="line-clamp-2 text-base font-bold text-dark-gray-2 hover:text-primary"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-dark-gray-3">
                Tamanho {size} · {quantity} {quantity === 1 ? "unidade" : "unidades"}
              </p>
            </div>
            <p className="hidden text-base font-bold text-dark-gray sm:block">{formatPrice(subtotal)}</p>
          </li>
        ))}
      </ul>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-light-gray-2 pt-4 text-sm">
        <span className="text-dark-gray-3">
          Frete: {order.shipping === 0 ? <strong className="text-success">Grátis</strong> : formatPrice(order.shipping)}
        </span>
        <span className="text-dark-gray-2">
          Total: <strong className="text-lg text-dark-gray">{formatPrice(total)}</strong>
        </span>
      </footer>
    </article>
  );
}

export default function OrdersPage() {
  const [tab, setTab] = useState<Tab>("todos");
  const visible = tab === "todos" ? orders : orders.filter((order) => order.status === tab);

  return (
    <Layout>
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-14 xl:px-[100px]">
        <div className="mx-auto max-w-[900px]">
          <h1 className="text-2xl font-bold text-dark-gray-2">Meus Pedidos</h1>
          <p className="mt-1 text-sm text-dark-gray-3">Acompanhe o status das suas compras.</p>

          <div role="tablist" aria-label="Filtrar pedidos por status" className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((t) => {
              const count = t.value === "todos" ? orders.length : orders.filter((o) => o.status === t.value).length;
              const active = tab === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.value)}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                    active ? "bg-primary text-white" : "bg-white text-dark-gray-2 hover:text-primary"
                  }`}
                >
                  {t.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {visible.length > 0 ? (
              visible.map((order) => <OrderCard key={order.number} order={order} />)
            ) : (
              <div className="flex flex-col items-center gap-3 rounded bg-white px-6 py-16 text-center">
                <PackageOpen size={40} className="text-light-gray" />
                <p className="text-base text-dark-gray-2">Nenhum pedido com esse status.</p>
                <Link to="/products" className="text-sm font-bold text-primary hover:underline">
                  Continuar comprando
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
