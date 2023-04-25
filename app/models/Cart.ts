import { type Product } from "./Product";

export interface Cart {
  id: string;
  products: Product[];
}

export function getCartTotalPrice(cart: Cart) {
  return cart.products.reduce((total, product) => total + product.price, 0);
}
