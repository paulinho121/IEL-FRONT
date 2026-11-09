export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  priceDiscount?: number;
  category: string;
  brand: string;
  gender: string;
  condition: "novo" | "usado";
  reference: string;
  stars: number;
  rating: number;
  description: string;
  images: { src: string }[];
  sizes: string[];
  colors: string[];
}

export interface LinkItem {
  text: string;
  link: string;
}

export interface FilterOption {
  text: string;
  value?: string;
}
