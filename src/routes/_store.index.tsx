import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Sparkles, ChevronLeft, ChevronRight, Leaf, ShieldCheck, Heart } from "lucide-react";
import { ProductCard } from "@/components/client/ProductCard";
import heroBg from "@/assets/31.png";
import turmericImg from "@/assets/turmeric.jpg";
import chilliImg from "@/assets/chilli.jpg";
import cardamomImg from "@/assets/cardamom.jpg";

// Map category → bundled image (resolved at build time by Vite)
const CATEGORY_IMAGES: Record<string, string> = {
  Turmeric: turmericImg,
  Chilli: chilliImg,
  Cardamom: cardamomImg,
};

export const getClientHomeFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getProducts, getTestimonials, getBanners, getCoupons } = await import("@/lib/db");
  const coupons = (await getCoupons()).filter((c) => {
    if (!c.active) return false;
    if (c.uses >= c.maxUses) return false;
    if (c.expiry) {
      const exp = new Date(c.expiry);
      if (!isNaN(exp.getTime()) && exp < new Date()) return false;
    }
    return true;
  });
  return {
    products: await getProducts(),
    testimonials: await getTestimonials(),
    banners: await getBanners(),
    coupons,
  };
});

export const Route = createFileRoute("/_store/")({
  component: ClientHome,
  loader: () => getClientHomeFn(),
  head: () => ({ meta: [{ title: "spvexport.com — Store" }] }),
});

function ClientHome() {
  const { products, testimonials, banners, coupons } = Route.useLoaderData();
  const [bannerIdx, setBannerIdx] = useState(0);

  const prevBanner = () => setBannerIdx((i) => (i === 0 ? banners.length - 1 : i - 1));
  const nextBanner = () => setBannerIdx((i) => (i === banners.length - 1 ? 0 : i + 1));

  const activeBanner = banners[bannerIdx];
  const activeCoupon = coupons[0]; // Show the first active coupon in the promo banner

  return (
    <>
      {/* Hero banner — animated carousel background */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.24), rgba(0,0,0,0.18)), url(${heroBg})`,
          backgroundSize: "110%",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          minHeight: "520px",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="h-3 w-3" /> Fresh harvest 2026
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl text-balance">
              The taste of <span className="text-primary">home</span>, perfected.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Stone-ground turmeric, sun-dried chillies and highland cardamom — delivered to your kitchen, fresh from ours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition">
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold hover:bg-accent/5 transition">
                New arrivals
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-elegant bg-gradient-hero flex items-center justify-center"
          >
            <div className="p-8 max-w-md text-left">
              {activeBanner?.text ? (
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4">
                  <p className="text-white font-display text-lg font-semibold">{activeBanner.text}</p>
                </div>
              ) : null}
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Discover our farm-fresh spices — carefully sourced and packaged.</p>
              </div>
            </div>
            {/* Banner navigation controls — only if admin added multiple banners */}
            {banners.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <button
                  onClick={prevBanner}
                  className="pointer-events-auto h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextBanner}
                  className="pointer-events-auto h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories pills */}
      <section className="relative py-12 bg-gradient-to-b from-background via-transparent to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 h-96 w-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-primary">Shop by Category</h2>
            <p className="text-sm text-muted-foreground mt-1">Explore our premium spice collection</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["All", "Turmeric", "Chilli", "Cardamom", "Best Sellers", "New"].map((c) => (
              <Link 
                key={c} 
                to="/shop"
                search={c !== "All" && c !== "Best Sellers" && c !== "New" ? { cat: c } : c === "Best Sellers" ? { sort: "best" } : c === "New" ? { sort: "new" } : {}}
                className="category-pill rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {products.length === 0 ? (
        <section className="py-20 text-center max-w-lg mx-auto px-6">
          <div className="rounded-3xl border border-dashed bg-card/30 p-10 flex flex-col items-center">
            <Sparkles className="h-10 w-10 text-accent mb-4 animate-pulse" />
            <h2 className="font-display text-2xl font-semibold">Something Exciting is Coming</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Our premium, organic farm-fresh spice collection is being carefully curated for you. 
              Check back soon — great flavours are on their way!
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent">
              <Leaf className="h-4 w-4" /> Launching soon
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Best sellers */}
          <Section title="Best sellers" subtitle="Loved by our customers">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 3).map((p) => (
                <ProductCard key={p.id} p={{ ...p, image: p.image || CATEGORY_IMAGES[p.category] }} />
              ))}
            </div>
          </Section>

          {/* Active coupon promo banner — rendered from admin's live coupon data */}
          {activeCoupon && (
            <section className="mx-auto max-w-7xl px-6">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 p-10 sm:p-14 shadow-soft">
                <div className="absolute inset-y-0 left-0 w-2 rounded-r-full bg-emerald-300" />
                <div className="absolute -right-16 -top-8 h-56 w-56 rounded-full bg-emerald-200 opacity-70 blur-3xl" />
                <div className="relative max-w-xl text-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">Special offer</p>
                  <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl text-slate-900">
                    {activeCoupon.description}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-700">
                    Use code <span className="font-mono font-bold text-slate-900">{activeCoupon.code}</span> at checkout.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Shop now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Trending */}
          <Section title="Trending" subtitle="What's flying off our shelves">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(3, 6).map((p) => (
                <ProductCard key={p.id} p={{ ...p, image: p.image || CATEGORY_IMAGES[p.category] }} />
              ))}
            </div>
          </Section>
        </>
      )}

      {/* Testimonials — only rendered when admin has added some */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-center">What our customers say</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-2xl border bg-card p-6 shadow-soft">
                  <Quote className="h-6 w-6 text-primary" />
                  <p className="mt-4 text-sm leading-relaxed">{t.quote}</p>
                  <p className="mt-4 text-xs font-semibold text-muted-foreground">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <hr className="mb-20 opacity-50" />
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
            About spvexport.com
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Pure Spices. Authentic Taste.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Founded with the vision to bridge the gap between traditional Indian spice farms and your kitchen, 
            spvexport.com brings you pure, unadulterated seasonings directly from native origins.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card/50 p-8 shadow-soft transition hover:shadow-elegant">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-6">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold">100% Organic Sourcing</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We partner directly with certified organic family farms across India—sourcing Erode turmeric, 
              Kashmiri chillies, and green cardamom from Idukki hills without pesticides or synthetic chemicals.
            </p>
          </div>

          <div className="rounded-2xl border bg-card/50 p-8 shadow-soft transition hover:shadow-elegant">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent mb-6">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold">Traditional Cold Milling</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Our products are stone-ground and cold-milled weekly in small batches. This traditional process 
              prevents heat buildup, preserving natural essential oils and intense flavor profiles.
            </p>
          </div>

          <div className="rounded-2xl border bg-card/50 p-8 shadow-soft transition hover:shadow-elegant">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold">Lab-Tested Purity</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Every batch undergoes strict quality control and independent lab testing to guarantee 
              zero adulteration, zero artificial coloring, and maximum curcumin and oil content.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight">{title}</h2>
            {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
          </div>
          <Link to="/shop" className="text-sm font-medium underline-offset-4 hover:underline">View all →</Link>
        </div>
        {children}
      </div>
    </section>
  );
}
