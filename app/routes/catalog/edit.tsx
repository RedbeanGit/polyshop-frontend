import { Stack, Typography } from "@mui/material";
import { type ActionArgs, redirect, type TypedResponse } from "@remix-run/node";
import { useState } from "react";
import { parseAction } from "~/actions";
import { type CatalogEditAction } from "~/actions/catalogEditActions";
import { createProduct } from "~/api/products";
import ProductEditor from "~/components/ProductEditor";
import { defaultProduct, type Product } from "~/models/Product";

export async function action({
  request,
}: ActionArgs): Promise<TypedResponse<null>> {
  const action = await parseAction<CatalogEditAction>(request);

  switch (action.action) {
    case "CATALOG_EDIT_SHOW_PRODUCTS":
      return redirect("/catalog/products");
    case "CATALOG_EDIT_CREATE_PRODUCT":
      try {
        await createProduct(action.product);
        return redirect("/catalog/products");
      } catch (error) {
        console.error(error);
        return redirect("/catalog/error");
      }
  }
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
