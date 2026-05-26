import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  loader: () => {
    throw redirect({ to: "/admin/products", replace: true });
  },
});
