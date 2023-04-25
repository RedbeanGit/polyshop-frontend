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
import { type AddToCartFromCatalogAction } from "~/actions/catalog";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const sendAction = useSendAction();

  const handleAddToCart = () => {
    sendAction({
      action: "ADD_TO_CART_FROM_CATALOG",
      product: { ...product, quantity: 1 },
    } as AddToCartFromCatalogAction);
  };

  return (
    <Card>
      <CardHeader
        title={product.name}
        subheader={product.quantity + " available"}
      />
      <CardContent>
        <Stack direction="column" sx={{ overflow: "hidden" }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {"$" + product.price}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          endIcon={<AddShoppingCartRoundedIcon />}
          onClick={() => handleAddToCart()}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
