import { Button, Stack } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "@remix-run/react";
import ErrorIndicator from "~/components/ErrorIndicator";

export default function CatalogErrorPage() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ width: "100%" }}
    >
      <ErrorIndicator message="Ouch! Something went wrong" />
      <Link to="/catalog/products">
        <Button variant="contained" startIcon={<ArrowBackRoundedIcon />}>
          Back to products
        </Button>
      </Link>
    </Stack>
  );
}
