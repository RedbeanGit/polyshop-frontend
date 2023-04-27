import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getOrderTotalPrice, type Order } from "~/models/Order";

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  const orderDate = new Date(order.date);

  return (
    <Card>
      <CardHeader
        title={`Order ${orderDate.getDay()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`}
        subheader={
          <Stack direction="column">
            <Typography>{`ID: ${order.id}`}</Typography>
            <Typography>{`Status: ${order.status}`}</Typography>
          </Stack>
        }
      />
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Typography fontWeight="bold">Items</Typography>
              <Typography fontWeight="bold">{`Total price: $${getOrderTotalPrice(
                order
              )}`}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Unite price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name ?? "Unamed item"}</TableCell>
                    <TableCell align="right">
                      {product.price ? `$${product.price}` : "No price"}
                    </TableCell>
                    <TableCell align="right">
                      {product.quantity + " units"}
                    </TableCell>
                    <TableCell align="right">
                      {product.price
                        ? `$${product.price * product.quantity}`
                        : "No price"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
