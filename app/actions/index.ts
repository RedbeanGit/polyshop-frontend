import { json } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";

export default interface Action {
  action: string;
}

export function useSendAction() {
  const submit = useSubmit();
  return (data: Object) =>
    submit({ body: JSON.stringify(data) }, { method: "post" });
}

export async function parseAction<T extends Action>(request: Request) {
  const form = await request.formData();
  const rawBody = form.get("body");

  if (!rawBody) {
    throw json("Missing body", { status: 400 });
  }
  if (typeof rawBody !== "string") {
    throw json("Malformed JSON body: expected string body", { status: 400 });
  }
  try {
    return JSON.parse(rawBody) as T;
  } catch {
    throw json("Malformed JSON body: could not parse", { status: 400 });
  }
}
