import type { Product } from "../types";

const gallery = [1, 2, 3, 4, 5].map((n) => ({ src: `/product-image-${n}.jpeg` }));

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";

type ProductSeed = Pick<Product, "name" | "price" | "category" | "brand" | "gender" | "condition"> &
  Partial<Pick<Product, "priceDiscount" | "stars" | "rating">>;

const seeds: ProductSeed[] = [
  { name: "K-Swiss V8 - Masculino", price: 200, priceDiscount: 100, category: "esporte-lazer", brand: "k-swiss", gender: "masculino", condition: "novo" },
  { name: "Tênis Nike Revolution 6 Next Nature Masculino", price: 219, category: "corrida", brand: "nike", gender: "masculino", condition: "novo", stars: 4.7, rating: 90 },
  { name: "Air Jordan 1 Mid - Unissex", price: 899.9, priceDiscount: 749.9, category: "casual", brand: "nike", gender: "unissex", condition: "novo" },
  { name: "Adidas Superstar - Feminino", price: 499.99, priceDiscount: 399.99, category: "casual", brand: "adidas", gender: "feminino", condition: "novo" },
  { name: "Puma Suede Classic - Unissex", price: 349.9, category: "casual", brand: "puma", gender: "unissex", condition: "usado" },
  { name: "Balenciaga Triple S - Masculino", price: 5999, priceDiscount: 4799, category: "utilitario", brand: "balenciaga", gender: "masculino", condition: "novo" },
  { name: "Adidas Ultraboost 22 - Masculino", price: 999.99, priceDiscount: 699.99, category: "corrida", brand: "adidas", gender: "masculino", condition: "novo" },
  { name: "Nike Air Max 90 - Feminino", price: 799.99, category: "esporte-lazer", brand: "nike", gender: "feminino", condition: "novo" },
  { name: "K-Swiss Court Express - Feminino", price: 279.9, priceDiscount: 199.9, category: "esporte-lazer", brand: "k-swiss", gender: "feminino", condition: "usado" },
  { name: "Puma RS-X - Masculino", price: 649.9, category: "corrida", brand: "puma", gender: "masculino", condition: "novo" },
  { name: "Balenciaga Speed - Feminino", price: 4299, category: "utilitario", brand: "balenciaga", gender: "feminino", condition: "usado" },
  { name: "Adidas Forum Low - Unissex", price: 599.99, priceDiscount: 479.99, category: "casual", brand: "adidas", gender: "unissex", condition: "novo" },
  { name: "Nike Pegasus 40 - Masculino", price: 899.99, priceDiscount: 629.99, category: "corrida", brand: "nike", gender: "masculino", condition: "novo" },
  { name: "K-Swiss Classic VN - Unissex", price: 329.9, category: "casual", brand: "k-swiss", gender: "unissex", condition: "novo" },
  { name: "Puma Cali Dream - Feminino", price: 499.9, priceDiscount: 349.9, category: "esporte-lazer", brand: "puma", gender: "feminino", condition: "usado" },
];

export const products: Product[] = seeds.map((seed, i) => ({
  id: i + 1,
  image: `/product-thumb-${(i % 5) + 1}.jpeg`,
  reference: `Casual | ${seed.brand.toUpperCase()} | REF:${38416711 + i * 7}`,
  stars: 4.7,
  rating: 90,
  description,
  images: gallery,
  sizes: ["39", "40", "41", "42", "43"],
  colors: ["#6FEEFF", "#FF6969", "#5E5E5E", "#6D70B7"],
  ...seed,
}));

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

/** Preço que o cliente paga de fato (com desconto, se houver). */
export function finalPrice(p: Pick<Product, "price" | "priceDiscount">) {
  return p.priceDiscount ?? p.price;
}

export const filterGroups = {
  brand: {
    title: "Marca",
    options: [
      { text: "Adidas", value: "adidas" },
      { text: "Balenciaga", value: "balenciaga" },
      { text: "K-Swiss", value: "k-swiss" },
      { text: "Nike", value: "nike" },
      { text: "Puma", value: "puma" },
    ],
  },
  category: {
    title: "Categoria",
    options: [
      { text: "Esporte e lazer", value: "esporte-lazer" },
      { text: "Casual", value: "casual" },
      { text: "Utilitário", value: "utilitario" },
      { text: "Corrida", value: "corrida" },
    ],
  },
  gender: {
    title: "Gênero",
    options: [
      { text: "Masculino", value: "masculino" },
      { text: "Feminino", value: "feminino" },
      { text: "Unissex", value: "unissex" },
    ],
  },
  condition: {
    title: "Estado",
    options: [
      { text: "Novo", value: "novo" },
      { text: "Usado", value: "usado" },
    ],
  },
};
