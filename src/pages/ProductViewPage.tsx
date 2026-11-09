import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "./Layout";
import Gallery from "../components/Gallery";
import BuyBox from "../components/BuyBox";
import ProductOptions from "../components/ProductOptions";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import { filterGroups, getProductById, products } from "../data/products";

export default function ProductViewPage() {
  const { id } = useParams();
  const product = getProductById(Number(id));
  // Guarda qual produto foi comprado, para a mensagem não "vazar" ao trocar de produto
  const [addedId, setAddedId] = useState<number | null>(null);

  if (!product) {
    return (
      <Layout>
        <div className="mx-auto max-w-[1440px] px-4 py-24 text-center md:px-10 xl:px-[100px]">
          <h1 className="text-2xl font-bold text-dark-gray">Produto não encontrado</h1>
          <Link to="/products" className="mt-6 inline-block text-lg text-primary hover:underline">
            Ver todos os produtos
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryName =
    filterGroups.category.options.find((o) => o.value === product.category)?.text ?? product.category;
  const recommended = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 xl:px-[100px] md:py-10">
        <nav aria-label="Trilha de navegação" className="mb-6 text-sm text-dark-gray-2">
          <ol className="flex flex-wrap gap-1">
            <li>
              <Link to="/" className="font-bold hover:text-primary">
                Home
              </Link>{" "}
              /
            </li>
            <li>
              <Link to="/products" className="hover:text-primary">
                Produtos
              </Link>{" "}
              /
            </li>
            <li>{categoryName} /</li>
            <li className="text-dark-gray-3">{product.name}</li>
          </ol>
        </nav>

        {/* key reinicia a galeria ao trocar de produto */}
        <div className="flex flex-col gap-8 xl:flex-row xl:gap-10">
          <Gallery
            key={product.id}
            images={product.images}
            showThumbs
            width="700"
            height="570"
            radius="4px"
            className="shrink-0"
          />

          <div className="flex-1">
            <BuyBox
              key={product.id}
              name={product.name}
              reference={product.reference}
              stars={product.stars}
              rating={product.rating}
              price={product.price}
              priceDiscount={product.priceDiscount}
              description={product.description}
              onBuy={() => setAddedId(product.id)}
            >
              <div>
                <h2 className="mb-2 text-sm font-bold text-light-gray">Tamanho</h2>
                <ProductOptions options={product.sizes} shape="square" type="text" radius="4px" label="Tamanho" />
              </div>
              <div>
                <h2 className="mb-2 text-sm font-bold text-light-gray">Cor</h2>
                <ProductOptions options={product.colors} shape="circle" type="color" label="Cor" />
              </div>
            </BuyBox>
            {addedId === product.id && (
              <p role="status" className="mt-4 text-sm font-bold text-success">
                Produto adicionado ao carrinho!
              </p>
            )}
          </div>
        </div>

        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: "Ver todos", href: "/products" }}
          className="mt-16 md:mt-20"
        >
          <ProductListing products={recommended} />
        </Section>
      </div>
    </Layout>
  );
}
