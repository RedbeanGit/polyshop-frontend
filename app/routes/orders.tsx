import { Container, Divider, Typography } from "@mui/material";
import { type TypedResponse, json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { getOrders } from "~/api/orders";
import CircularLoader from "~/components/CircularLoader";
import OrderList from "~/components/OrderList";
import { type Order } from "~/models/Order";

export async function loader(): Promise<TypedResponse<{ orders: Order[] }>> {
  return json({ orders: await getOrders() });
}

export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <Container>
      <Typography variant="h1">Orders</Typography>
      <Divider orientation="horizontal" sx={{ my: 2 }} />
      {state === "idle" ? <OrderList orders={orders} /> : <CircularLoader />}
    </Container>
  );
}
