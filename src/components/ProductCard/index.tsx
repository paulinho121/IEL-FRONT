import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export interface ProductCardProps {
  id?: number;
  image: string;
  name: string;
  price: number;
  priceDiscount?: number;
  category?: string;
}

export default function ProductCard({ id, image, name, price, priceDiscount, category = "Tênis" }: ProductCardProps) {
  const hasDiscount = priceDiscount !== undefined && priceDiscount < price;
  const discountPercent = hasDiscount ? Math.round((1 - priceDiscount / price) * 100) : 0;

  const content = (
    <>
      <div className="relative overflow-hidden rounded bg-white">
        {hasDiscount && (
          <span className="absolute top-3 left-3 rounded-full bg-lime px-3 py-1 text-xs font-bold text-dark-gray-2">
            {discountPercent}% OFF
          </span>
        )}
        <img
          src={image}
          alt={name}
          width={292}
          height={321}
          loading="lazy"
          className="aspect-[292/321] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-xs font-bold text-light-gray">{category}</p>
      <h3 className="mt-1 line-clamp-2 text-base text-dark-gray-2 md:text-2xl md:leading-snug">{name}</h3>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
        {hasDiscount ? (
          <>
            <del className="text-lg text-light-gray md:text-2xl">{formatPrice(price)}</del>
            <span className="text-lg font-bold text-dark-gray md:text-2xl">{formatPrice(priceDiscount)}</span>
          </>
        ) : (
          <span className="text-lg font-bold text-dark-gray md:text-2xl">{formatPrice(price)}</span>
        )}
      </p>
    </>
  );

  return id !== undefined ? (
    <Link to={`/product/${id}`} className="group block">
      {content}
    </Link>
  ) : (
    <div className="group">{content}</div>
  );
}
