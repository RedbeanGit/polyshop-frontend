import { type Product } from "~/models/Product";
import { makeGetRequest } from ".";

export async function getProducts(): Promise<Product[]> {
  const response = await makeGetRequest<Product[]>("/products");

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to get products: " + response.error);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await makeGetRequest<Product>(`/products/${id}`);

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to get product: " + response.error);
}
