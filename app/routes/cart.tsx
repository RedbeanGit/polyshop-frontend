import { Container, Divider, Typography } from "@mui/material";
import {
  type ActionArgs,
  json,
  type TypedResponse,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { parseAction } from "~/actions";
import { type CartAction } from "~/actions/cartActions";
import { addToCart, checkout, getCart, removeFromCart } from "~/api/cart";
import CartCard from "~/components/CartCard";
import CircularLoader from "~/components/CircularLoader";
import { type Cart } from "~/models/Cart";

export async function loader(): Promise<TypedResponse<{ cart: Cart }>> {
  return json({ cart: await getCart() });
}

export async function action({
  request,
}: ActionArgs): Promise<TypedResponse<null>> {
  const action = await parseAction<CartAction>(request);

  switch (action.action) {
    case "CART_ADD_PRODUCT":
      await addToCart(action.product);
      return redirect("/cart");
    case "CART_REMOVE_PRODUCT":
      await removeFromCart(action.product);
      return redirect("/cart");
    case "CART_CHECKOUT":
      await checkout();
      return redirect("/cart");
  }
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
