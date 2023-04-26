import { type Product } from "~/models/Product";
import { makeGetRequest, makePostRequest } from ".";

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

export async function createProduct(product: Product): Promise<Product> {
  const response = await makePostRequest<Product>("/products", product);

  if (response.status === 201 && response.data) {
    return response.data;
  }

  throw new Error("Failed to create product: " + response.error);
}
