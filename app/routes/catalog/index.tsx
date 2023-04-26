import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import CircularLoader from "~/components/CircularLoader";

export default function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => navigate("/catalog/products"), [navigate]);

  return <CircularLoader />;
}
