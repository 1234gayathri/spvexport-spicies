import { createFileRoute } from "@tanstack/react-router";
import { formatDate } from "@/lib/utils";
import turmericImg from "@/assets/turmeric.jpg";
import chilliImg from "@/assets/chilli.jpg";
import cardamomImg from "@/assets/cardamom.jpg";
import heroSpicesImg from "@/assets/hero-spices.jpg";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import cert11 from "@/assets/11.png";
import cert12 from "@/assets/12.png";
import cert13 from "@/assets/13.png";
import cert14 from "@/assets/14.png";
import cert15 from "@/assets/15.png";
import cert16 from "@/assets/16.png";
import cert17 from "@/assets/17.png";
import cert19 from "@/assets/19.png";


export const Route = createFileRoute("/_store/blog")({
  component: BlogPage,
});

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Organic Turmeric Powder: The Golden Heart of Every Kitchen",
    date: new Date("2026-05-04"),
    comments: 0,
    image: turmericImg,
    excerpt:
      "Discover why our Organic Turmeric Powder is the go-to spice for daily cooking, wellness teas, and bright, nourishing curries.",
  },
  {
    id: 2,
    title: "Raw Turmeric Fingers: Fresh Spice to Grind at Home",
    date: new Date("2026-05-03"),
    comments: 0,
    image: heroSpicesImg,
    excerpt:
      "Whole turmeric fingers deliver fresher aroma and deeper color when ground just before use, making every curry and golden milk more vibrant.",
  },
  {
    id: 3,
    title: "Green Cardamom Pods: Fragrance for Chai, Desserts, and Curries",
    date: new Date("2026-05-02"),
    comments: 0,
    image: cardamomImg,
    excerpt:
      "Hand-sorted cardamom pods add floral warmth and sweetness to sweets, chai, and rich savory sauces.",
  },
  {
    id: 4,
    title: "Kashmiri Chilli Powder: Vivid Color, Mild Heat, Rich Flavor",
    date: new Date("2026-04-28"),
    comments: 0,
    image: image1,
    excerpt:
      "Our premium Kashmiri chilli powder brings deep red color, smoky notes, and gentle heat to every simmering pot.",
  },
  {
    id: 5,
    title: "Spice Blend Essentials: Turmeric, Chilli, and Cardamom Together",
    date: new Date("2026-04-25"),
    comments: 0,
    image: image2,
    excerpt:
      "A vivid stack of turmeric, chilli and spice powders shows why these three are the foundation of every aromatic Indian pantry.",
  },
  {
    id: 6,
    title: "Storing Spices Right: Keep Turmeric, Chilli, and Cardamom Fresh",
    date: new Date("2026-04-22"),
    comments: 0,
    image: image3,
    excerpt:
      "Organize and preserve your whole spices with the right storage so the aroma lasts from the first pinch to the last.",
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <img
          src={heroSpicesImg}
          alt="Nature spices background"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold text-blue-100">Our Blog</h1>
          <p className="mt-2 text-blue-100/80">
            Stories, recipes, and product tips for turmeric, chilli, and
            cardamom lovers.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h2 className="line-clamp-3 text-lg font-semibold text-blue-600 transition group-hover:text-blue-700">
                  {post.title}
                </h2>

                {/* Meta */}
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <time>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.comments} Comments</span>
                </div>

                {/* Excerpt */}
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-block text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-700">
              Our Certificates
            </h2>
            <p className="mt-2 text-muted-foreground">
              Certified quality and authenticity for our premium spices
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert11}
                alt="Certificate 11"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert12}
                alt="Certificate 12"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert13}
                alt="Certificate 13"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert14}
                alt="Certificate 14"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert15}
                alt="Certificate 15"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert16}
                alt="Certificate 16"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert17}
                alt="Certificate 17"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-none bg-white shadow-sm transition hover:shadow-lg">
              <img
                src={cert19}
                alt="Certificate 19"
                className="h-56 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
