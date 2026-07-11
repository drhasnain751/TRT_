import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/trt/Nav";
import { Footer } from "@/components/trt/Footer";
import { Reveal } from "@/components/trt/Reveal";
import { ArrowRight, Check } from "lucide-react";
import the24Bg from "@/assets/the-24-bg.jpg";

export const Route = createFileRoute("/the-24")({
  head: () => ({
    meta: [
      { title: "The 24 — TRT Founders Circle" },
      { name: "description", content: "Become a founding member of The Real Toronto Basketball League. The 24 — a private Founders Circle. 24 legacy positions, once filled, never reopened." },
    ],
    links: [{ rel: "canonical", href: "/the-24" }],
  }),
  component: The24Page,
});

const TIERS_DISPLAY = [
  {
    positions: "1 – 4",
    price: "$5,000",
    label: "Pioneer",
    perks: [
      "Founding member recognition",
      "Season tickets — inaugural year",
      "Access to all six franchise launches",
      "TRT Founders jersey",
      "Private founders community",
    ],
  },
  {
    positions: "5 – 12",
    price: "$7,500",
    label: "Builder",
    perks: [
      "All Pioneer perks",
      "VIP courtside access",
      "Named on franchise wall of legacy",
      "Invitation to league operations briefings",
    ],
  },
  {
    positions: "13 – 20",
    price: "$10,000",
    label: "Architect",
    perks: [
      "All Builder perks",
      "Franchise advisory input",
      "Early access to investment rounds",
      "Annual founders dinner",
    ],
  },
  {
    positions: "21 – 24",
    price: "$15,000",
    label: "Legacy",
    perks: [
      "All Architect perks",
      "Lifetime recognition as founding Legacy member",
      "Access to TRT's inner league circle",
      "Direct line to league leadership",
    ],
  },
];

function The24Page() {
  return (
    <div className="bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-36 overflow-hidden">
        <div className="absolute inset-0">
          <img src={the24Bg} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black" />
        </div>
        <div className="container-x relative">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red">Members Only</p>
            <h1 className="font-display mt-6 text-[18vw] md:text-[11vw] leading-[0.82]">
              The<br />
              <span className="text-trt-red">24</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-lg text-white/70 leading-relaxed">
              A private Founders Circle helping build the future of TRT. Twenty-four legacy positions. Once filled, never reopened.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] font-semibold bg-trt-red text-white hover:bg-white hover:text-black transition-all"
              >
                Apply for a Position <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tracker */}
      <section className="border-t border-white/10 py-20">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Founder Tracker</p>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white/60">
                <span className="h-2 w-2 rounded-full bg-trt-red animate-pulse-dot" />
                Live
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square border border-white/15 flex items-center justify-center text-[11px] font-mono text-white/40 hover:border-trt-red hover:text-trt-red transition-colors"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Positions Available</span>
              <span className="font-display text-2xl">24 / 24</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red mb-3">Pricing Tiers</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.9] mb-16">Choose your seat<br />in history.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {TIERS_DISPLAY.map((tier, i) => (
              <Reveal key={tier.label} delay={i * 0.07}>
                <div className="bg-black p-8 flex flex-col h-full">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-trt-red">{tier.label}</p>
                    <p className="text-[10px] text-white/40">#{tier.positions}</p>
                  </div>
                  <p className="font-display text-4xl mt-4">{tier.price}</p>
                  <ul className="mt-8 space-y-3 flex-1">
                    {tier.perks.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-white/70">
                        <Check size={14} className="text-trt-red shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 py-3 text-[11px] uppercase tracking-[0.18em] border border-white/20 hover:border-trt-red hover:text-trt-red transition-colors"
                  >
                    Apply <ArrowRight size={12} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / what is this */}
      <section className="border-t border-white/10 py-24 bg-black">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl mb-12">What is The 24?</h2>
          </Reveal>
          {[
            {
              q: "Why only 24 positions?",
              a: "The 24 is intentionally limited. When you build something, you want it in the hands of the right people — those who genuinely believe in TRT's mission and want to shape it from the inside.",
            },
            {
              q: "What does a founding member actually get?",
              a: "Beyond the tangible perks — tickets, jerseys, access — founders become part of the inner community building this property. This is a relationship, not just a transaction.",
            },
            {
              q: "Once positions are filled, what happens?",
              a: "The Founders Circle closes. Permanently. There will be no re-opens, waitlists, or exceptions. That exclusivity is part of what makes this meaningful.",
            },
          ].map((item, i) => (
            <Reveal key={item.q} delay={i * 0.08}>
              <div className="border-t border-white/10 py-8">
                <h3 className="font-display text-2xl">{item.q}</h3>
                <p className="mt-3 text-white/60 leading-relaxed">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
