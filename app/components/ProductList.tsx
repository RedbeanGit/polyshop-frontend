import { Grid, Typography } from "@mui/material";
import { type Product } from "~/models/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return products.length > 0 ? (
    <Grid container direction="row" spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>No products found</Typography>
  );
}
