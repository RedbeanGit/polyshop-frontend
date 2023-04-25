import { type Product } from "~/models/Product";
import type Action from ".";

export interface AddToCartFromCatalogAction extends Action {
  type: "ADD_TO_CART_FROM_CATALOG";
  product: Product;
}
