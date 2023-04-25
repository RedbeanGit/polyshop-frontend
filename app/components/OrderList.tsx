import { Stack, Typography } from "@mui/material";
import { type Order } from "~/models/Order";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  return orders.length > 0 ? (
    <Stack direction="column" alignItems="stretch" spacing={2}>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </Stack>
  ) : (
    <Typography>No orders found</Typography>
  );
}
