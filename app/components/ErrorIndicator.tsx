import { Container, Stack, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

interface ErrorIndicatorProps {
  message: string;
}

export default function ErrorIndicator({ message }: ErrorIndicatorProps) {
  return (
    <Container sx={{ width: "100%" }}>
      <Stack direction="column" alignItems="center" spacing={4}>
        <ErrorOutlineRoundedIcon
          sx={{ width: "200px", height: "200px", color: "error.main" }}
        />
        <Typography fontWeight="bold" fontSize={30} color="error.main">
          {message}
        </Typography>
      </Stack>
    </Container>
  );
}
