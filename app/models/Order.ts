import { type Product } from "./Product";

export enum OrderStatus {
  CREATED = "CREATED",
  POSSIBLE = "POSSIBLE",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  CANCELLED = "CANCELLED",
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  products: Product[];
}

export function getOrderTotalPrice(order: Order): number {
  return order.products.reduce(
    (acc, product) => acc + (product.price ?? 0) * product.quantity,
    0
  );
}
