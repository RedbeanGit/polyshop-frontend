import { type Order } from "~/models/Order";
import { makeGetRequest } from ".";
import { type Product } from "~/models/Product";

export async function getOrderProducts(orderId: string): Promise<Product[]> {
  const response = await makeGetRequest<Product[]>(
    `/orders/${orderId}/products`
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to fetch order products");
}

export async function getOrder(orderId: string): Promise<Order> {
  const response = await makeGetRequest<Order>(`/orders/${orderId}`);

  if (response.status === 200 && response.data) {
    return {
      ...response.data,
      products: await getOrderProducts(orderId),
    };
  }

  throw new Error("Failed to fetch order");
}

export async function getOrders(): Promise<Order[]> {
  const response = await makeGetRequest<Order[]>("/orders");

  if (response.status === 200 && response.data) {
    return Promise.all(
      response.data.map(
        async (order) =>
          ({
            ...order,
            products: await getOrderProducts(order.id),
          } as Order)
      )
    );
  }

  throw new Error("Failed to fetch orders");
}
