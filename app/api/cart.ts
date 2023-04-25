import { type Cart } from "~/models/Cart";
import { makeGetRequest, makePostRequest } from ".";
import { v4 as uuid } from "uuid";
import { getProduct } from "./products";
import { type Product } from "~/models/Product";

interface InternalProduct {
  id: string;
  quantity: number;
}

async function getCartProducts(): Promise<InternalProduct[]> {
  const response = await makeGetRequest<InternalProduct[]>("/cart");

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to get cart products: " + response.error);
}

export async function getCart(): Promise<Cart> {
  return {
    id: uuid(),
    products: await Promise.all(
      (
        await getCartProducts()
      ).map(async (cartProduct) => {
        const product = await getProduct(cartProduct.id);
        return {
          ...product,
          quantity: cartProduct.quantity,
        };
      })
    ),
  };
}

export async function addToCart(product: Product): Promise<Product> {
  const response = await makePostRequest<InternalProduct>("/cart/add", {
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
  const response = await makePostRequest<InternalProduct>("/cart/remove", {
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
