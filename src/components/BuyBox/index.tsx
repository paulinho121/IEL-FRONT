import type { ReactNode } from "react";
import starIcon from "../../assets/star-icon.svg";
import { formatPrice } from "../../utils/formatPrice";

interface BuyBoxProps {
  name: string;
  reference: string;
  stars: number;
  rating: number;
  price: number;
  priceDiscount?: number;
  description: string;
  children?: ReactNode;
  onBuy?: () => void;
}

export default function BuyBox({
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
  onBuy,
}: BuyBoxProps) {
  const hasDiscount = priceDiscount !== undefined && priceDiscount < price;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl leading-tight font-bold text-dark-gray md:text-[32px]">{name}</h1>
        <p className="mt-2 text-xs text-dark-gray-3">{reference}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex h-7 items-center gap-1 rounded bg-warning px-2 text-sm font-bold text-white">
          {stars.toFixed(1).replace(".", ",")}
          {/* O SVG tem traço escuro; o filtro deixa a estrela branca como pede a doc */}
          <img src={starIcon} alt="" className="size-3.5 brightness-0 invert" />
        </span>
        <span className="text-sm text-light-gray">({rating} avaliações)</span>
      </div>

      <p className="flex flex-wrap items-baseline gap-3">
        {hasDiscount ? (
          <>
            <span className="text-[32px] font-bold text-dark-gray-2">{formatPrice(priceDiscount)}</span>
            <del className="text-base text-light-gray-2">{formatPrice(price)}</del>
          </>
        ) : (
          <span className="text-[32px] font-bold text-dark-gray-2">{formatPrice(price)}</span>
        )}
      </p>

      <div>
        <h2 className="mb-2 text-sm font-bold text-light-gray">Descrição do produto</h2>
        <p className="text-sm leading-6 text-dark-gray-2">{description}</p>
      </div>

      {children}

      <button
        type="button"
        onClick={onBuy}
        className="h-12 w-full rounded-lg bg-warning text-base font-bold tracking-wide text-white uppercase transition hover:brightness-95 md:w-[220px]"
      >
        Comprar
      </button>
    </div>
  );
}
