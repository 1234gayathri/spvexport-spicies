import { createFileRoute, Link } from "@tanstack/react-router";
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from "@/lib/constants";

export const Route = createFileRoute("/_store/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Order via WhatsApp — spvexport.com" }] }),
});

function Checkout() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I would like to place an order for your spice selection. Please share availability and pricing.",
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-[2rem] border border-slate-200 bg-card p-10 shadow-soft">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Order by WhatsApp
          </p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Order directly on WhatsApp
          </h1>
          <p className="text-muted-foreground text-sm leading-7">
            We have simplified ordering for this store. Send your request to our WhatsApp business number below and we will confirm product availability, pricing, and delivery details.
          </p>

          <div className="grid gap-4 sm:grid-cols-[1fr_280px]">
            <div className="rounded-3xl border border-slate-200 bg-background p-6">
              <p className="text-sm font-semibold">WhatsApp Number</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {WHATSAPP_DISPLAY}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Tap the button to start a chat and place your order directly.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-card p-6">
              <p className="text-sm font-semibold">Suggested message</p>
              <pre className="mt-3 rounded-2xl border bg-background p-4 text-xs leading-6 text-muted-foreground overflow-x-auto">
Hello, I would like to order your spices. Please share availability and pricing.
              </pre>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 transition"
          >
            Open WhatsApp chat
          </a>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/shop"
              className="rounded-full border border-slate-200 px-6 py-4 text-sm font-semibold text-foreground text-center hover:bg-slate-100 transition"
            >
              Browse products
            </Link>
            <Link
              to="/"
              className="rounded-full border border-slate-200 px-6 py-4 text-sm font-semibold text-foreground text-center hover:bg-slate-100 transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
