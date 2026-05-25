import { createFileRoute } from "@tanstack/react-router";
import { Globe, Package, Smile, Calendar } from "lucide-react";

export const Route = createFileRoute("/_store/about")({
  component: About,
  head: () => ({ meta: [{ title: "About — spvexport.com" }] }),
});

function About() {
  const stats = [
    {
      icon: Globe,
      value: "50+",
      label: "Countries Served",
    },
    {
      icon: Package,
      value: "100000+",
      label: "MT Exported",
    },
    {
      icon: Smile,
      value: "500+",
      label: "Happy Clients",
    },
    {
      icon: Calendar,
      value: "25+",
      label: "Years Experience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Who We Are</p>
          <h1 className="font-display text-5xl font-semibold sm:text-6xl mt-4 mb-3">
            Premium Export Excellence
          </h1>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent mb-6">
            ✦ Global Trade · Local Expertise ✦
          </p>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            SPV Global is a well-established title in the Indian Spices industry, known for Manufacturing and Exporting out a different choice of premium mixed seasonings and true Indian Spices. As a trusted exporter, distributor, and producer, we offer an broad run of both entire and ground Spices.
          </p>
          <p className="mt-6 text-sm text-foreground font-semibold">
            Contact: <a href="tel:+919866752785" className="underline">+91 98667 52785</a>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-border/50 bg-card/30 p-8 text-center backdrop-blur-sm transition hover:border-accent/50 hover:bg-card/50"
              >
                <Icon className="mx-auto h-10 w-10 text-accent mb-4" />
                <p className="font-display text-4xl font-semibold text-accent">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Details Section */}
      <section className="border-t bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To deliver the finest quality Indian spices to global markets, maintaining the highest standards of purity, authenticity, and sustainability. We believe in preserving traditional farming methods while embracing modern processing techniques.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every product we export carries the legacy of generations of spice farmers and the promise of uncompromised quality and taste.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">Our Promise</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-muted-foreground">100% Pure and Authentic Indian Spices</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-muted-foreground">Directly sourced from trusted Indian farms</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-muted-foreground">Stringent quality control and testing</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-muted-foreground">Sustainable and ethical farming practices</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-muted-foreground">Fast and reliable global shipping</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-center mb-12">Why Choose SPV Global</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Expertise",
              description: "Over 25 years of experience in the spice industry with deep knowledge of cultivation, processing, and export.",
            },
            {
              title: "Quality Assurance",
              description: "Every batch undergoes rigorous testing for purity, potency, and safety to meet international standards.",
            },
            {
              title: "Global Reach",
              description: "Serving 50+ countries with consistent supply and competitive pricing for bulk orders.",
            },
            {
              title: "Sustainability",
              description: "We support fair trade practices and environmentally responsible farming throughout our supply chain.",
            },
            {
              title: "Innovation",
              description: "Modern facilities combined with traditional knowledge to deliver the finest spices to your doorstep.",
            },
            {
              title: "Customer Support",
              description: "Dedicated support team to handle inquiries, bulk orders, and ensure satisfaction with every purchase.",
            },
          ].map((value, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50 transition"
            >
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
