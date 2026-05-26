import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, createWhatsAppUrl } from "@/lib/constants";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact — Sadbhaav Spices" }] }),
});

function ContactPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I would like to place an order for your spices. Please share availability and pricing.",
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-card p-10 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Contact & Orders
          </p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl mt-4">
            Order directly on WhatsApp
          </h1>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Our website is built to adapt automatically across desktop, tablet, and mobile screens. Use WhatsApp to place an order, confirm product availability, and receive pricing details instantly.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-background p-6">
              <p className="text-sm font-semibold">WhatsApp Number</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {WHATSAPP_DISPLAY}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Send your order message now and we will reply with the next steps.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-background p-6">
              <p className="text-sm font-semibold">Email Support</p>
              <p className="mt-3 text-sm font-semibold text-foreground">{CONTACT_EMAIL}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                For export inquiries and business partnerships, email us anytime.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 transition"
            >
              Chat on WhatsApp
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-4 text-sm font-semibold text-foreground hover:bg-slate-100 transition"
            >
              Back to home
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-emerald-50 p-8 shadow-soft">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Why order on WhatsApp?</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                WhatsApp ordering gives you a direct, fast, and secure channel to confirm your spice selection, pricing, shipping and export support.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold">Fast response</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your message goes straight to our order team for quick confirmation.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold">Mobile-friendly</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  The site layout adjusts automatically across phones, tablets, and desktops.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold">Professional support</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We help you choose the right spices and complete the order with export-ready packaging.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
