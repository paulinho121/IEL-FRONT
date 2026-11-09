export type ProductCategory = 
  | 'All'
  | 'Workstations'
  | 'Displays'
  | 'Precision Input'
  | 'Audio & Acoustics'
  | 'Modular Power & Docks'
  | 'Desk Architecture';

export interface Colorway {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ConfigOptionItem {
  id: string;
  label: string;
  description?: string;
  priceDelta: number;
}

export interface ConfigGroup {
  id: string;
  name: string;
  options: ConfigOptionItem[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  verifiedStudio: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  brand: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isDrop?: boolean;
  badge?: {
    text: string;
    variant: 'radiant' | 'technical' | 'emerald' | 'cobalt';
  };
  heroImage: string;
  galleryImages: {
    url: string;
    label: string;
  }[];
  colorways: Colorway[];
  specs: ProductSpec[];
  highlights: string[];
  configGroups?: ConfigGroup[];
  description: string;
  engineeringManifesto: string;
  inTheBox: string[];
  benchmark?: {
    metric: string;
    value: string;
    comparison: string;
  };
  reviews: Review[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedColorway: Colorway;
  selectedOptions: Record<string, string>; // group.id -> option.id
  quantity: number;
  unitPrice: number;
}
