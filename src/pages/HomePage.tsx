import Layout from "./Layout";
import Gallery from "../components/Gallery";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import { products } from "../data/products";

const slides = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ src: `/home-slide-${n}.jpeg` }));

const collections = [
  { src: "/collection-1.png", alt: "Novo drop Supreme" },
  { src: "/collection-2.png", alt: "Coleção Adidas" },
  { src: "/collection-3.png", alt: "Novo Beats Bass" },
];

// 8 produtos em alta, como pede a documentação
const trending = products.slice(0, 8);

export default function HomePage() {
  return (
    <Layout>
      <Gallery images={slides} width="1440" height="681" showDots className="mx-auto" />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-4 py-14 md:gap-20 md:px-10 xl:px-[100px] md:py-20">
        <Section title="Coleções em destaque" titleAlign="center">
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {collections.map((collection) => (
              <li key={collection.src}>
                <img
                  src={collection.src}
                  alt={collection.alt}
                  width={405}
                  height={251}
                  className="w-full rounded object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Produtos em alta" titleAlign="left" link={{ text: "Ver todos", href: "/products" }}>
          <ProductListing products={trending} />
        </Section>
      </div>
    </Layout>
  );
}
