import { type Product } from "~/models/Product";
import type Action from ".";

export interface CatalogEditShowProductsAction extends Action {
  action: "CATALOG_EDIT_SHOW_PRODUCTS";
}

export interface CatalogEditCreateProductAction extends Action {
  action: "CATALOG_EDIT_CREATE_PRODUCT";
  product: Product;
}

export type CatalogEditAction =
  | CatalogEditShowProductsAction
  | CatalogEditCreateProductAction;
