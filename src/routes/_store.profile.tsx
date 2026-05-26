import { createFileRoute, Link } from "@tanstack/react-router";
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from "@/lib/constants";

export const Route = createFileRoute("/_store/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Help with ordering — Sadbhaav Spices" }] }),
});

function ProfilePage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I need help placing a spice order. Please let me know how to proceed.",
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-[2rem] border border-slate-200 bg-card p-10 shadow-soft">
        <div className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Order support
          </p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Profile-based checkout is removed
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm leading-7">
            We now handle all orders directly through WhatsApp. Please message us at the number below so we can confirm your spice selection, pricing, and delivery details.
          </p>

          <div className="grid gap-4 sm:grid-cols-[1fr_280px]">
            <div className="rounded-3xl border border-slate-200 bg-background p-6">
              <p className="text-sm font-semibold">Send WhatsApp message</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {WHATSAPP_DISPLAY}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-card p-6 text-left">
              <p className="text-sm font-semibold">Suggested text</p>
              <pre className="mt-3 rounded-2xl border bg-background p-4 text-xs leading-6 text-muted-foreground overflow-x-auto">
Hello, I would like to place an order for your spice products. Please share availability and pricing.
              </pre>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row items-center justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 transition"
            >
              Open WhatsApp chat
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-4 text-sm font-semibold text-foreground hover:bg-slate-100 transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
