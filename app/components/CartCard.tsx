import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { getCartTotalPrice, type Cart } from "~/models/Cart";
import { type Product } from "~/models/Product";
import { useSendAction } from "~/actions";
import {
  type RemoveFromCartAction,
  type AddToCartAction,
  type CheckoutCartAction,
} from "~/actions/cart";

interface CartCardProps {
  cart: Cart;
}

export default function CartCard({ cart }: CartCardProps) {
  const sendAction = useSendAction();

  const handleAddToCart = (product: Product) => {
    sendAction({
      action: "ADD_TO_CART",
      cart,
      product,
    } as AddToCartAction);
  };

  const handleRemoveFromCart = (product: Product) => {
    sendAction({
      action: "REMOVE_FROM_CART",
      cart,
      product,
    } as RemoveFromCartAction);
  };

  const handleCheckout = () => {
    sendAction({
      action: "CHECKOUT_CART",
      cart,
    } as CheckoutCartAction);
  };

  return (
    <Card>
      <CardHeader title="Cart" />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Typography>Items</Typography>
          <Divider orientation="horizontal" />
          {cart.products.length > 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                  <TableCell align="right">Total price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
                      {"$" + product.price + " / unit"}
                    </TableCell>
                    <TableCell>
                      {"$" + product.price * product.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" alignItems="center">
                        <IconButton onClick={() => handleAddToCart(product)}>
                          <RemoveRoundedIcon />
                        </IconButton>
                        <Typography>{product.quantity}</Typography>
                        <IconButton
                          onClick={() => handleRemoveFromCart(product)}
                        >
                          <AddRoundedIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Total</Typography>
                  </TableCell>
                  <TableCell colSpan={2} />
                  <TableCell align="right">
                    {"$" + getCartTotalPrice(cart)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Typography>No items in cart</Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          endIcon={<ShoppingCartCheckoutRoundedIcon />}
          onClick={() => handleCheckout()}
        >
          Checkout
        </Button>
      </CardActions>
    </Card>
  );
}
