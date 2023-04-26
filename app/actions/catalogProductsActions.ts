import { type Product } from "~/models/Product";
import type Action from ".";

export interface CatalogProductAddProductAction extends Action {
  type: "CATALOG_PRODUCTS_ADD_PRODUCT";
  product: Product;
}

export interface CatalogProductShowEditAction extends Action {
  type: "CATALOG_PRODUCTS_SHOW_EDIT";
}

export type CatalogProductsAction =
  | CatalogProductAddProductAction
  | CatalogProductAddProductAction;
