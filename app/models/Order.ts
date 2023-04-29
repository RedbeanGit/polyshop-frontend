import { type Product } from "./Product";

export enum OrderStatus {
  CREATED = "CREATED",
  CHECKED = "CHECKED",
  CHECK_FAILED = "CHECK_FAILED",
  PAID = "PAID",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  SHIPPED = "SHIPPED",
  SHIPPING_FAILED = "SHIPPING_FAILED",
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
