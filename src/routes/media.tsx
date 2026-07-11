import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/trt/Nav";
import { Footer } from "@/components/trt/Footer";
import { Reveal } from "@/components/trt/Reveal";
import crowdImg from "@/assets/crowd-energy.jpg";
import streetImg from "@/assets/street-ball.jpg";
import courtImg from "@/assets/court-aerial.jpg";
import playerImg from "@/assets/player-shadow.jpg";
import heroImg from "@/assets/hero-toronto.jpg";
import the24Bg from "@/assets/the-24-bg.jpg";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — TRT" },
      { name: "description", content: "Announcements, press releases, stories, videos and community moments from The Real Toronto Basketball League." },
      { property: "og:title", content: "TRT Media" },
      { property: "og:description", content: "The TRT editorial newsroom — announcements, stories, video and culture." },
    ],
    links: [{ rel: "canonical", href: "/media" }],
  }),
  component: MediaPage,
});

const categories = ["All", "Announcements", "Press", "Videos", "Community", "Franchises"];

const stories = [
  { cat: "Announcements", t: "TRT unveils six founding franchise markets across the GTA", img: heroImg, date: "2026" },
  { cat: "Press", t: "The Real Toronto Basketball League launches with U23 pathway", img: crowdImg, date: "2026" },
  { cat: "Videos", t: "Inside the Toronto basketball ecosystem TRT was built to serve", img: streetImg, date: "Series" },
  { cat: "Community", t: "Court rebuilds: Scarborough, Brampton and beyond", img: courtImg, date: "Ongoing" },
  { cat: "Franchises", t: "Downtown Royals — building from the capital outward", img: playerImg, date: "Profile" },
  { cat: "Announcements", t: "The 24: TRT opens applications for Founders Circle", img: the24Bg, date: "Open" },
];

function MediaPage() {
  const [filter, setFilter] = useState<string>("All");
  const [email, setEmail] = useState("");
  const filtered = filter === "All" ? stories : stories.filter((s) => s.cat === filter);

  return (
    <div className="bg-black text-white">
      <Nav />

      <section className="pt-32 md:pt-44 pb-16 border-b border-white/10">
        <div className="container-x">
          <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red animate-fade-up">Newsroom</p>
          <h1 className="font-display mt-6 text-[16vw] md:text-[10vw] leading-[0.85] animate-fade-up">
            The <span className="text-trt-red">story</span>.
          </h1>
        </div>
      </section>

      <section className="py-12 border-b border-white/10 sticky top-16 md:top-20 bg-black/80 backdrop-blur-xl z-30">
        <div className="container-x flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] border transition-colors ${
                filter === c ? "border-trt-red bg-trt-red text-white" : "border-white/15 text-white/60 hover:border-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          {filtered[0] && (
            <Reveal>
              <a className="group block mb-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-[5/4] overflow-hidden">
                    <img src={filtered[0].img} alt={filtered[0].t} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-trt-red">Featured · {filtered[0].cat}</p>
                    <h2 className="font-display mt-4 text-5xl md:text-7xl leading-[0.95] group-hover:text-trt-red transition-colors">
                      {filtered[0].t}
                    </h2>
                    <p className="mt-6 text-white/60">{filtered[0].date}</p>
                  </div>
                </div>
              </a>
            </Reveal>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {filtered.slice(1).map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <a className="group block">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-trt-red">{s.cat}</p>
                  <h3 className="font-display mt-2 text-2xl group-hover:text-trt-red transition-colors">{s.t}</h3>
                  <p className="mt-2 text-xs text-white/40">{s.date}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="container-x grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red">Subscribe</p>
            <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[0.95]">First to know. Every drop.</h2>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="md:col-span-6 flex gap-3 border-b border-white/20 pb-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              maxLength={255}
              className="flex-1 bg-transparent py-3 outline-none placeholder:text-white/30"
            />
            <button className="bg-trt-red px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-white hover:text-black transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
