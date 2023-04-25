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
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getOrderTotalPrice, type Order } from "~/models/Order";

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <Card>
      <CardHeader
        title={`Order ${order.date} (${order.status})`}
        subheader={<Typography>{`ID: ${order.id}`}</Typography>}
      />
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Items</Typography>
              <Typography>{`$${getOrderTotalPrice(order)}`}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableBody>
                {order.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align="center">{product.id}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">
                      {product.quantity + " units"}
                    </TableCell>
                    <TableCell align="center">{`$${product.price}`}</TableCell>
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
