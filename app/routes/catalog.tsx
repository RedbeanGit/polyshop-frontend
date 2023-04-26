import { Container, Divider, Typography } from "@mui/material";
import { Outlet } from "@remix-run/react";

export default function CatalogPage() {
  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant="h1">Catalog</Typography>
      <Divider orientation="horizontal" sx={{ my: 2 }} />
      <Outlet />
    </Container>
  );
}
