export type PerfumeType =
  | "Spray Perfume"
  | "Oil Perfume"
  | "Eau de Parfum"
  | "Eau de Toilette"
  | "Fragrance / EDT"
  | "Fruity fragrance"
  | "Fragrance";

export type ProductCategory =
  | "Spray Perfumes"
  | "Oil Perfumes"
  | "Designer Inspired"
  | "Body Mists"
  | "Gift Sets"
  | "Men's"
  | "Women's"
  | "Unisex"
  | "Fruity";

export type ProductTag =
  "Best Seller" | "New Arrival" | "Affordable" | "Signature" | "Premium" | "Gift";

export interface FragranceNotes {
  top: string;
  middle: string;
  base: string;
}

export interface Product {
  id: string;
  name: string;
  type: PerfumeType;
  category: ProductCategory;
  size: string;
  price: number; // in UGX (e.g. 5,000 to 200,000)
  stock: number;
  description: string;
  notes: FragranceNotes;
  displayNotes: string;
  image: string;
  tag: ProductTag;
  isAvailable: boolean;
  createdAt: number;
  gender?: "Men's" | "Women's" | "Unisex";
  scentProfile?: string;
  custom?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = "Pending" | "Confirmed" | "Ready" | "Completed" | "Cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  type: PerfumeType;
  size: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface Order {
  id: string; // e.g. "FC-2609-4182"
  customerName: string;
  phoneNumber: string;
  deliveryLocation: string;
  instructions?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: number;
}
