import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_store/account")({
  component: AccountPage,
  head: () => ({ meta: [{ title: "My Account — spvexport.com" }] }),
});

function AccountPage() {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted/40 rounded-lg w-2/3 mx-auto"></div>
        <div className="h-4 bg-muted/30 rounded-lg w-4/5 mx-auto"></div>
      </div>
      <p className="mt-6 text-muted-foreground">Redirecting...</p>
    </div>
  );
}
