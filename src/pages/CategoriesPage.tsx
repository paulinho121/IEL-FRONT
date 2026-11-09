import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "./Layout";
import Section from "../components/Section";
import { filterGroups, products } from "../data/products";

// Texto e foto de capa de cada categoria (fotos diferentes para os cards não se repetirem)
const categoryDetails: Record<string, { description: string; image: string }> = {
  "esporte-lazer": { description: "Conforto para treinar, caminhar e aproveitar o fim de semana.", image: "/product-thumb-5.jpeg" },
  casual: { description: "Clássicos que combinam com qualquer look do dia a dia.", image: "/product-thumb-3.jpeg" },
  utilitario: { description: "Modelos robustos, com solado reforçado e muito estilo.", image: "/product-thumb-4.jpeg" },
  corrida: { description: "Leveza e amortecimento para render mais em cada passada.", image: "/product-thumb-2.jpeg" },
};

// Cada categoria mostra quantos produtos tem no catálogo
const categories = filterGroups.category.options.map((option) => ({
  ...option,
  ...categoryDetails[option.value],
  count: products.filter((p) => p.category === option.value).length,
}));

const brands = filterGroups.brand.options.map((option) => ({
  ...option,
  count: products.filter((p) => p.brand === option.value).length,
}));

export default function CategoriesPage() {
  return (
    <Layout>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-4 py-10 md:gap-20 md:px-10 md:py-14 xl:px-[100px]">
        <Section title="Categorias" titleAlign="left" link={{ text: "Ver todos os produtos", href: "/products" }}>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.value}>
                <Link
                  to={`/products?category=${category.value}`}
                  className="group flex h-full flex-col overflow-hidden rounded bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="overflow-hidden">
                    <img
                      src={category.image}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-xl font-bold text-dark-gray">{category.text}</h3>
                    <p className="text-sm text-dark-gray-3">{category.description}</p>
                    <p className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3 text-sm whitespace-nowrap">
                      <span className="text-light-gray">
                        {category.count} {category.count === 1 ? "produto" : "produtos"}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-primary">
                        Ver produtos <ArrowRight size={16} />
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Marcas" titleAlign="center">
          <ul className="flex flex-wrap justify-center gap-4">
            {brands.map((brand) => (
              <li key={brand.value}>
                <Link
                  to={`/products?brand=${brand.value}`}
                  className="flex h-[60px] items-center gap-3 rounded-full border border-light-gray-2 bg-white px-6 text-base font-bold text-dark-gray-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {brand.text}
                  <span className="rounded-full bg-light-gray-3 px-2 py-0.5 text-xs font-normal text-dark-gray-3">
                    {brand.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </Layout>
  );
}
