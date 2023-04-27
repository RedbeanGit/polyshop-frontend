import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { type Product } from "~/models/Product";
import { useSendAction } from "~/actions";
import { type CatalogProductAddProductAction } from "~/actions/catalogProductsActions";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const sendAction = useSendAction();

  const handleAddToCart = () => {
    sendAction({
      action: "CATALOG_PRODUCTS_ADD_PRODUCT",
      product: { ...product, quantity: 1 },
    } as CatalogProductAddProductAction);
  };

  return (
    <Card>
      <CardHeader
        title={product.name ?? "Unamed item"}
        subheader={product.quantity + " available"}
      />
      <CardContent>
        <Stack direction="column" sx={{ overflow: "hidden" }} spacing={4}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.description ?? "No description"}
          </Typography>
          <Typography textAlign="center" fontSize={26} fontWeight="bold">
            {product.price ? "$" + product.price : "No price"}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack sx={{ width: "100%" }}>
          <Button
            endIcon={<AddShoppingCartRoundedIcon />}
            onClick={() => handleAddToCart()}
            variant="outlined"
          >
            Add to cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
