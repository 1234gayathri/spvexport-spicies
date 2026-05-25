import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_store/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Complete Your Profile — Sadbhaav Spices" }] }),
});

function ProfilePage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("customerProfile");
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setName(profile.name || "");
        setEmail(profile.email || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!/\d{10}/.test(phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSaving(true);
    try {
      const profile = { name, email, phone, address, completedAt: new Date().toISOString() };
      localStorage.setItem("customerProfile", JSON.stringify(profile));
      toast.success("Profile saved successfully!");
      setTimeout(() => {
        nav({ to: "/checkout" });
      }, 500);
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Complete Your Profile</p>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Delivery Information</h1>
        <p className="text-muted-foreground">We need your details to deliver your order safely. You can update this anytime before ordering.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Full Name</span>
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email Address</span>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Phone Number</span>
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Delivery Address</span>
              </div>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, building name, apartment number, etc."
                rows={4}
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition resize-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 transition cursor-pointer mt-8"
          >
            <Check className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save & Continue to Checkout"}
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Your information is secure and only used for order delivery.
        </p>
      </div>
    </div>
  );
}
