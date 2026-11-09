import ProductCard, { type ProductCardProps } from "../ProductCard";

interface ProductListingProps {
  products: ProductCardProps[];
  /** Quantidade de colunas no desktop (4 na home, 3 na listagem, que divide a tela com os filtros). */
  columns?: 3 | 4;
}

export default function ProductListing({ products, columns = 4 }: ProductListingProps) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-base text-dark-gray-3">Nenhum produto encontrado.</p>;
  }

  return (
    <ul className={`grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 ${columns === 4 ? "lg:grid-cols-4" : "xl:grid-cols-3"}`}>
      {products.map(({ id, image, name, price, priceDiscount }, index) => (
        <li key={id ?? index}>
          <ProductCard id={id} image={image} name={name} price={price} priceDiscount={priceDiscount} />
        </li>
      ))}
    </ul>
  );
}
