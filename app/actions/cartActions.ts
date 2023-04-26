import type Action from ".";
import { type Product } from "~/models/Product";

export interface CartAddProductAction extends Action {
  action: "CART_ADD_PRODUCT";
  product: Product;
}

export interface CartRemoveProductAction extends Action {
  action: "CART_REMOVE_PRODUCT";
  product: Product;
}

export interface CartCheckoutAction extends Action {
  action: "CART_CHECKOUT";
}

export type CartAction =
  | CartAddProductAction
  | CartRemoveProductAction
  | CartCheckoutAction;
