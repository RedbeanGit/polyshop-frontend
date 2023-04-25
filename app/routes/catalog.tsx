import { Container, Divider, Typography } from "@mui/material";
import { type ActionArgs, type TypedResponse, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { parseAction } from "~/actions";
import { type AddToCartFromCatalogAction } from "~/actions/catalog";
import { addToCart } from "~/api/cart";
import { getProducts } from "~/api/products";
import CircularLoader from "~/components/CircularLoader";
import ProductList from "~/components/ProductList";
import { type Product } from "~/models/Product";

export async function loader(): Promise<
  TypedResponse<{ products: Product[] }>
> {
  return json({ products: await getProducts() });
}

export async function action({ request }: ActionArgs) {
  const action = await parseAction<AddToCartFromCatalogAction>(request);

  switch (action.action) {
    case "ADD_TO_CART_FROM_CATALOG":
      await addToCart(action.product);
  }
  return null;
}

export default function CatalogPage() {
  const { products } = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <Form method="post">
      <Container sx={{ width: "100%" }}>
        <Typography variant="h1">Catalog</Typography>
        <Divider orientation="horizontal" sx={{ my: 2 }} />
        {state === "idle" ? (
          <ProductList products={products} />
        ) : (
          <CircularLoader />
        )}
      </Container>
    </Form>
  );
}
