import { type Cart } from "~/models/Cart";
import type Action from ".";
import { type Product } from "~/models/Product";

export interface AddToCartAction extends Action {
  action: "ADD_TO_CART";
  cart: Cart;
  product: Product;
}

export interface RemoveFromCartAction extends Action {
  action: "REMOVE_FROM_CART";
  cart: Cart;
  product: Product;
}

export interface CheckoutCartAction extends Action {
  action: "CHECKOUT_CART";
  cart: Cart;
}

export type CartAction =
  | AddToCartAction
  | RemoveFromCartAction
  | CheckoutCartAction;
