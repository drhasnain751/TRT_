import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/trt/Nav";
import { Footer } from "@/components/trt/Footer";
import { Reveal } from "@/components/trt/Reveal";
import { FRANCHISES } from "@/lib/trt-data";
import { ArrowUpRight } from "lucide-react";
import playerImg from "@/assets/player-shadow.jpg";
import streetImg from "@/assets/street-ball.jpg";
import courtImg from "@/assets/court-aerial.jpg";
import crowdImg from "@/assets/crowd-energy.jpg";
import heroImg from "@/assets/hero-toronto.jpg";
import the24Bg from "@/assets/the-24-bg.jpg";

const IMG_BY_SLUG: Record<string, string> = {
  "downtown-toronto": heroImg,
  "scarborough": playerImg,
  "brampton": courtImg,
  "vaughan": the24Bg,
  "mississauga": crowdImg,
  "durham": streetImg,
};

export const Route = createFileRoute("/franchises")({
  head: () => ({
    meta: [
      { title: "Franchises — TRT" },
      { name: "description", content: "Six franchises across the Greater Toronto Area. Brampton, Durham, Mississauga, Scarborough, Downtown, Vaughan." },
      { property: "og:title", content: "TRT Franchises" },
      { property: "og:description", content: "Six franchises. One regional identity. Meet the founding teams." },
    ],
    links: [{ rel: "canonical", href: "/franchises" }],
  }),
  component: FranchisesPage,
});

function FranchisesPage() {
  return (
    <div className="bg-black text-white">
      <Nav />

      <section className="pt-32 md:pt-44 pb-16 border-b border-white/10">
        <div className="container-x">
          <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red animate-fade-up">Six Founding Franchises</p>
          <h1 className="font-display mt-6 text-[16vw] md:text-[10vw] leading-[0.85] animate-fade-up">
            The <span className="text-trt-red">teams.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70 animate-fade-up">
            Six regions. Six identities. One unified league system across the Greater Toronto Area.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FRANCHISES.map((f, i) => (
              <Reveal key={f.slug} delay={i * 0.06}>
                <Link
                  to="/franchises/$slug"
                  params={{ slug: f.slug }}
                  className="group block bg-black border border-white/10 hover:border-trt-red transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={IMG_BY_SLUG[f.slug]}
                      alt={f.city}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/80">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-trt-red" />
                      {f.tag}
                    </div>
                    <ArrowUpRight size={20} className="absolute top-4 right-4 text-white/60 group-hover:text-trt-red group-hover:rotate-45 transition-all" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-trt-red">{f.founded}</p>
                      <h3 className="font-display mt-2 text-4xl md:text-5xl">{f.city}</h3>
                      <p className="mt-1 text-white/60">{f.name}</p>
                    </div>
                  </div>
                  <div className="p-6 border-t border-white/10">
                    <p className="font-display text-lg text-white/90">"{f.mission}"</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/40">{f.venue}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
