import { Container, Divider, Typography } from "@mui/material";
import { type ActionArgs, json, type TypedResponse } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { parseAction } from "~/actions";
import { type CartAction } from "~/actions/cart";
import { addToCart, checkout, getCart, removeFromCart } from "~/api/cart";
import CartCard from "~/components/CartCard";
import CircularLoader from "~/components/CircularLoader";
import { type Cart } from "~/models/Cart";
import { type Product } from "~/models/Product";

export async function loader(): Promise<TypedResponse<{ cart: Cart }>> {
  return json({ cart: await getCart() });
}

export async function action({
  request,
}: ActionArgs): Promise<TypedResponse<{ cart: Cart }>> {
  const action = await parseAction<CartAction>(request);
  let product: Product;

  switch (action.action) {
    case "ADD_TO_CART":
      product = await addToCart(action.product);
      return json({
        cart: {
          ...action.cart,
          products: action.cart.products.map((p) => {
            if (p.id === product.id) {
              return product;
            } else {
              return p;
            }
          }),
        },
      });
    case "REMOVE_FROM_CART":
      product = await removeFromCart(action.product);
      return json({
        cart: {
          ...action.cart,
          products: action.cart.products
            .map((p) => {
              if (p.id === product.id) {
                return product;
              } else {
                return p;
              }
            })
            .filter((p) => p.quantity > 0),
        },
      });
    case "CHECKOUT_CART":
      const success = await checkout();
      if (success) {
        return json({ cart: { id: action.cart.id, products: [] } });
      } else {
        return json({ cart: action.cart });
      }
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
