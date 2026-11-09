import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Layout from "./Layout";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import FilterGroup from "../components/FilterGroup";
import { filterGroups, finalPrice, products } from "../data/products";
import type { Product } from "../types";

type SortOrder = "relevance" | "lowest" | "highest";
type FilterKey = keyof typeof filterGroups;
type Filters = Record<FilterKey, string[]>;

const emptyFilters: Filters = { brand: [], category: [], gender: [], condition: [] };

/** Remove acentos e caixa para a busca achar "tenis" em "Tênis". */
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

function matchesSearch(product: Product, term: string) {
  if (!term) return true;
  // Todo o catálogo é de tênis, então "tênis" também encontra qualquer produto
  const haystack = normalize(`tênis ${product.name} ${product.brand} ${product.category} ${product.gender}`);
  return normalize(term)
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("filter") ?? "";
  const [sort, setSort] = useState<SortOrder>("lowest");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggleFilter(key: FilterKey, value: string, checked: boolean, single = false) {
    setFilters((prev) => ({
      ...prev,
      [key]: single ? [value] : checked ? [...prev[key], value] : prev[key].filter((v) => v !== value),
    }));
  }

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        matchesSearch(p, search) &&
        (filters.brand.length === 0 || filters.brand.includes(p.brand)) &&
        (filters.category.length === 0 || filters.category.includes(p.category)) &&
        (filters.gender.length === 0 || filters.gender.includes(p.gender)) &&
        (filters.condition.length === 0 || filters.condition.includes(p.condition)),
    );
    if (sort === "relevance") return filtered;
    // Copia antes de ordenar para não mutar o array filtrado
    return [...filtered].sort((a, b) =>
      sort === "lowest" ? finalPrice(a) - finalPrice(b) : finalPrice(b) - finalPrice(a),
    );
  }, [search, filters, sort]);

  const hasActiveFilters = Object.values(filters).some((values) => values.length > 0);
  const total = visibleProducts.length;
  const title = `${search ? `Resultados para “${search}” - ` : ""}${total} ${total === 1 ? "produto" : "produtos"}`;

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-8 md:px-10 xl:px-[100px] md:py-10 lg:flex-row lg:items-start lg:gap-7">
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[308px]">
          {/* Ordenar por */}
          <div className="flex flex-col gap-2">
            <label htmlFor="sort" className="text-base text-dark-gray-2">
              Ordenar por
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOrder)}
              className="h-[60px] w-full cursor-pointer rounded border border-dark-gray-2 bg-transparent px-4 text-base text-dark-gray-2 outline-none focus:border-primary lg:w-[308px]"
            >
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
              <option value="relevance">Mais relevantes</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className="flex h-12 items-center justify-center gap-2 rounded bg-primary text-sm font-bold text-white lg:hidden"
          >
            <SlidersHorizontal size={18} />
            {filtersOpen ? "Esconder filtros" : "Filtrar"}
          </button>

          {/* Filtrar por */}
          <div className={`rounded bg-white p-[30px] lg:block lg:w-[308px] ${filtersOpen ? "block" : "hidden"}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-dark-gray-2">Filtrar por</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => setFilters(emptyFilters)}
                  className="text-sm text-primary hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>
            <hr className="mt-5 mb-5 border-light-gray-2" />

            {(["brand", "category", "gender"] as const).map((key) => (
              <FilterGroup
                key={key}
                title={filterGroups[key].title}
                inputType="checkbox"
                options={filterGroups[key].options}
                selected={filters[key]}
                onChange={(value, checked) => toggleFilter(key, value, checked)}
              />
            ))}
            <FilterGroup
              title={filterGroups.condition.title}
              inputType="radio"
              options={filterGroups.condition.options}
              selected={filters.condition}
              onChange={(value, checked) => toggleFilter("condition", value, checked, true)}
            />
          </div>
        </aside>

        <Section title={title} titleAlign="left" className="min-w-0 flex-1">
          <ProductListing products={visibleProducts} columns={3} />
        </Section>
      </div>
    </Layout>
  );
}
