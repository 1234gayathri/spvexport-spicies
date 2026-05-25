import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ClientNav, ClientFooter } from "@/components/client/Nav";

export const Route = createFileRoute("/_store")({
  component: ClientLayout,
});

function ClientLayout() {
  return (
    <div className="min-h-screen bg-white bg-background flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <ClientNav />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <ClientFooter />
    </div>
  );
}
