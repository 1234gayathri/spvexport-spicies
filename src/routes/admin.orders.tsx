import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders")({
  loader: () => {
    throw redirect({ to: "/admin/products", replace: true });
  },
});
