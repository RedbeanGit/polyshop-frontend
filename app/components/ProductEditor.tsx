import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSendAction } from "~/actions";
import {
  type CatalogEditCreateProductAction,
  type CatalogEditShowProductsAction,
} from "~/actions/catalogEditActions";
import { type Product } from "~/models/Product";

interface ProductEditorProps {
  product: Product;
  onChange: (product: Product) => void;
}

interface ProductEditorErrors {
  checked: boolean;
  name?: string;
  description?: string;
  price?: string;
  quantity?: string;
}

export default function ProductEditor({
  product,
  onChange,
}: ProductEditorProps) {
  const sendAction = useSendAction();
  const [errors, setErrors] = useState<ProductEditorErrors>({
    checked: false,
  });

  const validate = () => {
    const newErrors = errors;
    let isValid = true;

    if (!product.name || product.name.length === 0) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = undefined;
    }

    if (!product.description || product.description.length === 0) {
      newErrors.description = "Description is required";
      isValid = false;
    } else {
      newErrors.description = undefined;
    }

    if (product.price === undefined || product.price < 0) {
      newErrors.price = "Price must be greater or equal than 0";
      isValid = false;
    } else {
      newErrors.price = undefined;
    }

    if (product.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
      isValid = false;
    } else {
      newErrors.quantity = undefined;
    }

    setErrors({ ...newErrors, checked: true });
    return isValid;
  };

  const handleCancel = () => {
    sendAction({
      action: "CATALOG_EDIT_SHOW_PRODUCTS",
    } as CatalogEditShowProductsAction);
  };

  const handleSubmit = () => {
    if (validate()) {
      sendAction({
        action: "CATALOG_EDIT_CREATE_PRODUCT",
        product,
      } as CatalogEditCreateProductAction);
    }
  };

  return (
    <Stack direction="column" sx={{ width: "100" }} spacing={6}>
      <Stack direction="column" spacing={4}>
        <TextField
          value={product.name ?? "Unamed product"}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          variant="standard"
          label="Name"
          error={errors.name !== undefined}
          helperText={errors.name}
        />
        <TextField
          value={product.description ?? "No description"}
          onChange={(e) =>
            onChange({ ...product, description: e.target.value })
          }
          variant="standard"
          label="Description"
          error={errors.description !== undefined}
          helperText={errors.description}
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
          error={errors.price !== undefined}
          helperText={errors.price}
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
          error={errors.quantity !== undefined}
          helperText={errors.quantity}
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
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
