export interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  quantity: number;
}

export const defaultProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};
