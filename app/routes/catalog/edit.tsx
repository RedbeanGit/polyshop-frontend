import { Stack, Typography } from "@mui/material";
import { type ActionArgs, redirect, type TypedResponse } from "@remix-run/node";
import { useState } from "react";
import { parseAction } from "~/actions";
import ProductEditor from "~/components/ProductEditor";
import { defaultProduct, type Product } from "~/models/Product";

export async function action({
  request,
}: ActionArgs): Promise<TypedResponse<null>> {
  const action = await parseAction(request);

  switch (action.action) {
    case "CATALOG_EDIT_SHOW_PRODUCTS":
      return redirect("/catalog/products");
  }

  throw new Error(`Unknown action: ${action.action}`);
}

export default function CatalogEditPage() {
  const [product, setProduct] = useState<Product>(defaultProduct);

  return (
    <Stack direction="column" spacing={6}>
      <Typography color="text.secondary" fontStyle="italic">
        Create a new product
      </Typography>
      <ProductEditor product={product} onChange={setProduct} />
    </Stack>
  );
}
