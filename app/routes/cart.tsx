import { Container, Divider, Typography } from "@mui/material";
import { type ActionArgs, json, type TypedResponse } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { parseAction } from "~/actions";
import { type CartAction } from "~/actions/cart";
import { addToCart, checkout, getCart, removeFromCart } from "~/api/cart";
import CartCard from "~/components/CartCard";
import CircularLoader from "~/components/CircularLoader";
import { type Cart } from "~/models/Cart";

export async function loader(): Promise<TypedResponse<{ cart: Cart }>> {
  return json({ cart: await getCart() });
}

export async function action({ request }: ActionArgs): Promise<null> {
  const action = await parseAction<CartAction>(request);

  switch (action.action) {
    case "ADD_TO_CART":
      await addToCart(action.product);
    case "REMOVE_FROM_CART":
      await removeFromCart(action.product);
    case "CHECKOUT_CART":
      await checkout();
  }
  return null;
}

export default function CartPage() {
  const { cart } = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant="h1">Cart</Typography>
      <Divider orientation="horizontal" sx={{ my: 2 }} />
      {state === "idle" ? <CartCard cart={cart} /> : <CircularLoader />}
    </Container>
  );
}
