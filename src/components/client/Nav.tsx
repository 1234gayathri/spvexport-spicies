import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { WHATSAPP_DISPLAY } from "@/lib/constants";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Blog" },
];

const productCategories = [
  { label: "Turmeric", search: { cat: "Turmeric" } },
  { label: "Chilli", search: { cat: "Chilli" } },
  { label: "Cardamom", search: { cat: "Cardamom" } },
];

export function ClientNav() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate({ to: "/shop", search: { q: searchVal.trim() } });
      setShowSearch(false);
      setSearchVal("");
      setOpen(false);
    }
  };

  return (
    <>
      {/* Green Header Bar */}
      <div className="bg-emerald-700 text-white text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <a
              href="mailto:exim@spvexports.com"
              className="flex items-center gap-1 sm:gap-2 hover:opacity-90 transition text-white hover:text-white/80"
              title="Email us"
            >
              <span>📧</span>
              <span className="hidden sm:inline truncate">exim@spvexports.com</span>
            </a>
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              <span>📞</span>
              <span className="hidden lg:inline">{WHATSAPP_DISPLAY}</span>
              <span className="lg:hidden">{WHATSAPP_DISPLAY}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-3.5">
          <Logo to="/" />
          <nav className="ml-6 hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition hover:bg-accent/10 ${
                  path === l.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent/10 flex items-center gap-1">
                  Product
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {productCategories.map((cat) => (
                  <DropdownMenuItem key={cat.label} asChild>
                    <Link
                      to="/shop"
                      search={cat.search as any}
                      className="cursor-pointer"
                    >
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            {showSearch ? (
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  autoFocus
                  placeholder="Search spices..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="h-9 w-40 sm:w-56 rounded-full border bg-background pl-4 pr-8 py-1.5 text-xs outline-none focus:border-primary transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchVal("");
                  }}
                  className="ml-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition px-1"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent/10 transition"
                aria-label="Search"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent/10 transition"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t bg-background px-3 sm:px-6 py-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search spices..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full rounded-full border bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </form>
            <div className="space-y-1">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {l.label}
                </Link>
              ))}
              <details className="py-2">
                <summary className="text-sm font-medium text-muted-foreground hover:text-foreground transition cursor-pointer">
                  Product
                </summary>
                <div className="pl-4 mt-2 space-y-1">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      to="/shop"
                      search={cat.search as any}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function ClientFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-emerald-50 text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 px-3 sm:px-6 py-12 sm:py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo to="/" />
          <p className="mt-4 text-sm leading-7 text-slate-700 max-w-xs">
            At SPV Export Spices, every meal has a story to tell. Our spices
            bring flavor, quality, and trust to kitchens across India and
            beyond.
          </p>
        </div>
        <FooterCol
          title="Products"
          links={[
            ["All Products", "/shop"],
            ["Turmeric", "/shop?cat=Turmeric"],
            ["Chilli", "/shop?cat=Chilli"],
            ["Cardamom", "/shop?cat=Cardamom"],
          ]}
        />
        <FooterCol
          title="Quick Links"
          links={[
            ["Home", "/"],
            ["About Us", "/about"],
            ["Blog & News", "/blog"],
          ]}
        />
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            Contact Us
          </div>
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-900">Sadbhaav Spices</p>
            <p>Elango Street, Alwarthirunagar</p>
            <p>Chennai, Tamil Nadu 600087</p>
            <p>District: Chennai</p>
            <p>India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 px-3 sm:px-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} SPV Export Spices · Exporting Company ·
        Crafted in India
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([l, h]) => (
          <li key={l}>
            <Link to={h} className="text-sm hover:text-primary transition">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
