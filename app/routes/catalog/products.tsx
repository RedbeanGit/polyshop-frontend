import { Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  type TypedResponse,
  json,
  type ActionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { parseAction, useSendAction } from "~/actions";
import { addToCart } from "~/api/cart";
import { getProducts } from "~/api/products";
import CircularLoader from "~/components/CircularLoader";
import ProductList from "~/components/ProductList";
import { type Product } from "~/models/Product";
import {
  type CatalogProductShowEditAction,
  type CatalogProductsAction,
} from "~/actions/catalogProductsActions";

export async function loader(): Promise<
  TypedResponse<{ products: Product[] }>
> {
  try {
    return json({ products: await getProducts() });
  } catch (error) {
    console.error(error);
    return redirect("/catalog/error");
  }
}

export async function action({
  request,
}: ActionArgs): Promise<TypedResponse<null>> {
  const action = await parseAction<CatalogProductsAction>(request);

  switch (action.action) {
    case "CATALOG_PRODUCTS_ADD_PRODUCT":
      try {
        await addToCart(action.product);
        return redirect("/catalog/products");
      } catch (error) {
        console.error(error);
        return redirect("/catalog/error");
      }
    case "CATALOG_PRODUCTS_SHOW_EDIT":
      return redirect("/catalog/edit");
  }

  throw new Error(`Unknown action: ${action.action}`);
}

export default function CatalogProductsPage() {
  const { products } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const sendAction = useSendAction();

  const handleNewProduct = () => {
    sendAction({
      action: "CATALOG_PRODUCTS_SHOW_EDIT",
    } as CatalogProductShowEditAction);
  };

  return state === "idle" ? (
    <Stack direction="column" spacing={6}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography color="text.secondary" fontStyle="italic">
          Choose products to add to your cart
        </Typography>
        <Button
          endIcon={<AddRoundedIcon />}
          variant="contained"
          onClick={() => handleNewProduct()}
        >
          New product
        </Button>
      </Stack>
      <ProductList products={products} />
    </Stack>
  ) : (
    <CircularLoader />
  );
}
