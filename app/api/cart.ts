import { type Cart } from "~/models/Cart";
import { makeGetRequest, makePostRequest } from ".";
import { v4 as uuid } from "uuid";
import { type Product } from "~/models/Product";

async function getCartProducts(): Promise<Product[]> {
  const response = await makeGetRequest<Product[]>("/cart");

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to get cart products: " + response.error);
}

export async function getCart(): Promise<Cart> {
  return {
    id: uuid(),
    products: await getCartProducts(),
  };
}

export async function addToCart(product: Product): Promise<Product> {
  const response = await makePostRequest<Product>("/cart/add", {
    productId: product.id,
    quantity: product.quantity,
  });

  if (response.status === 200 && response.data) {
    return {
      ...product,
      quantity: response.data.quantity,
    };
  }

  throw new Error("Failed to add product to cart: " + response.error);
}

export async function removeFromCart(product: Product): Promise<Product> {
  const response = await makePostRequest<Product>("/cart/remove", {
    productId: product.id,
    quantity: product.quantity,
  });

  if (response.status === 200 && response.data) {
    return {
      ...product,
      quantity: response.data.quantity,
    };
  }

  throw new Error("Failed to remove product from cart: " + response.error);
}

export async function checkout(): Promise<boolean> {
  const response = await makePostRequest<boolean>("/cart/checkout", {});

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to checkout cart: " + response.error);
}
