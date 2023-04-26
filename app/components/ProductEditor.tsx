import { Button, Stack, TextField } from "@mui/material";
import { useSendAction } from "~/actions";
import { type CatalogEditShowProductsAction } from "~/actions/catalogEditActions";
import { type Product } from "~/models/Product";

interface ProductEditorProps {
  product: Product;
  onChange: (product: Product) => void;
}

export default function ProductEditor({
  product,
  onChange,
}: ProductEditorProps) {
  const sendAction = useSendAction();

  const handleSubmit = (product: Product) => {
    sendAction({
      action: "CREATE_PRODUCT",
      product,
    });
  };

  const handleCancel = () => {
    sendAction({
      action: "CATALOG_EDIT_SHOW_PRODUCTS",
    } as CatalogEditShowProductsAction);
  };

  return (
    <Stack direction="column" sx={{ width: "100" }} spacing={6}>
      <Stack direction="column" spacing={4}>
        <TextField
          value={product.name ?? "Unamed product"}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          variant="standard"
          label="Name"
        />
        <TextField
          value={product.description ?? "No description"}
          onChange={(e) =>
            onChange({ ...product, description: e.target.value })
          }
          variant="standard"
          label="Description"
        />
        <TextField
          value={product.price ?? 0}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            onChange({ ...product, price: isNaN(value) ? 0 : value });
          }}
          type="number"
          variant="standard"
          label="Price"
        />
        <TextField
          value={product.quantity ?? 0}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            onChange({ ...product, quantity: isNaN(value) ? 0 : value });
          }}
          type="number"
          variant="standard"
          label="Quantity"
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%" }}
        alignItems="center"
      >
        <Button
          variant="outlined"
          sx={{ flexGrow: 1 }}
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ flexGrow: 1 }}
          onClick={() => handleSubmit(product)}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
