import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ArrowDown, MapPin, Calendar, Ticket, ShoppingBag } from "lucide-react";
import { Nav } from "@/components/trt/Nav";
import { Footer } from "@/components/trt/Footer";
import { Reveal } from "@/components/trt/Reveal";
import { Marquee } from "@/components/trt/Marquee";
import { FRANCHISES, UPCOMING_GAMES } from "@/lib/trt-data";
import heroImg from "@/assets/hero-toronto.jpg";
import playerImg from "@/assets/player-shadow.jpg";
import courtImg from "@/assets/court-aerial.jpg";
import crowdImg from "@/assets/crowd-energy.jpg";
import hoodieImg from "@/assets/trt-classic-hoodie.png";
import capImg from "@/assets/trt-monogram-cap.png";
import jerseyImg from "@/assets/royals-inaugural-jersey.png";
import ballImg from "@/assets/trt-leather-ball.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRT — The Real Toronto Basketball League" },
      { name: "description", content: "Toronto's professional basketball league. Six franchises. Two levels. One system. Legacy lives here." },
      { property: "og:title", content: "TRT — The Real Toronto Basketball League" },
      { property: "og:description", content: "Toronto's professional basketball league. Six franchises. Two levels. One system." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Nav />
      <GamesTickerBar />
      <Hero />
      <Marquee items={["Toronto", "Scarborough", "Brampton", "Vaughan", "Mississauga", "Durham", "Downtown", "Legacy Lives Here"]} />

      {/* Single Main Featured Story */}
      <FeaturedStory />

      {/* Short, high-impact introductory stats to get straight to the point */}
      <QuickStatsSection />

      {/* Franchise Grid / Teams Selection */}
       <FranchiseGrid /> 

      {/* New: Tickets section */}
      <TicketsSection />

      {/* New: Store Section */}
      <StoreSection />

      {/* Community Banner with a clean link to full elaboration */}
      <CommunityBanner />

      <Footer />
    </div>
  );
}

/* ── Games Ticker Bar ─────────────────────────────── */
function GamesTickerBar() {
  const [gameScores, setGameScores] = useState<Record<string, { homeScore: number; awayScore: number }>>({});
  const [playerScores, setPlayerScores] = useState<Record<string, number>>({});

  const upcomingGame = UPCOMING_GAMES[0];
  const gameKey = `${upcomingGame.home}_${upcomingGame.away}`;
  const score = gameScores[gameKey] || { homeScore: 0, awayScore: 0 };

  const homeTeam = FRANCHISES.find((f) => f.city === "Scarborough") || { players: [] };
  const awayTeam = FRANCHISES.find((f) => f.city === "Mississauga") || { players: [] };
  const homePlayers = homeTeam.players.slice(0, 2);
  const awayPlayers = awayTeam.players.slice(0, 2);

  const incrementPlayerPoints = (playerId: string, team: "home" | "away") => {
    setPlayerScores((prev) => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + 1,
    }));

    setGameScores((prev) => {
      const current = prev[gameKey] || { homeScore: 0, awayScore: 0 };
      return {
        ...prev,
        [gameKey]: {
          homeScore: team === "home" ? current.homeScore + 1 : current.homeScore,
          awayScore: team === "away" ? current.awayScore + 1 : current.awayScore,
        },
      };
    });
  };

  return (
    <div className="fixed top-16 md:top-20 inset-x-0 z-40 bg-trt-red backdrop-blur-sm overflow-hidden">
      <div className="px-4 md:px-8 py-2 md:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Game Info - Compact */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-white">
              <span className="text-xs md:text-sm font-semibold">{upcomingGame.home}</span>
              <span className="text-[10px] text-white/60">vs</span>
              <span className="text-xs md:text-sm font-semibold">{upcomingGame.away}</span>
              <span className="text-[9px] text-white/50">•</span>
              <span className="text-[9px] text-white/70">{upcomingGame.date}</span>
              <span className="text-[9px] text-white/50">•</span>
              <span className="text-[9px] text-white/70">{upcomingGame.venue}</span>
            </div>
          </div>

          {/* Score Display - Minimal */}
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-2xl flex-shrink-0">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{score.homeScore}</div>
              <div className="text-[8px] text-white/60 uppercase">SBR</div>
            </div>
            <div className="text-white/40">:</div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{score.awayScore}</div>
              <div className="text-[8px] text-white/60 uppercase">MIS</div>
            </div>
          </div>

          {/* Score Buttons */}
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => {
                setGameScores((prev) => ({
                  ...prev,
                  [gameKey]: { homeScore: score.homeScore + 1, awayScore: score.awayScore },
                }));
              }}
              className="px-2 py-1 bg-white text-trt-red text-[9px] font-semibold uppercase rounded-full hover:bg-white/90 transition-colors"
            >
              +1
            </button>
            <button
              onClick={() => {
                setGameScores((prev) => ({
                  ...prev,
                  [gameKey]: { homeScore: score.homeScore, awayScore: score.awayScore + 1 },
                }));
              }}
              className="px-2 py-1 bg-white text-trt-red text-[9px] font-semibold uppercase rounded-full hover:bg-white/90 transition-colors"
            >
              +1
            </button>
          </div>
        </div>
      </div>

      {UPCOMING_GAMES.length > 1 ? (
        <div className="border-t border-white/20 overflow-hidden bg-trt-red/50">
          <div className="flex items-center h-6 animate-marquee whitespace-nowrap">
            {[...UPCOMING_GAMES.slice(1), ...UPCOMING_GAMES.slice(1)].map((g, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6 h-full text-[8px] uppercase tracking-[0.15em] text-white/70 font-semibold border-r border-white/20">
                <span>{g.date}</span>
                <span>{g.home}</span>
                <span className="text-white/50">vs</span>
                <span>{g.away}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      style={{ paddingTop: "calc(8rem + 36px)" }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Toronto basketball"
          className="h-[120%] w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_85%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="flex-1" />
        <div className="container-x pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/70"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-trt-red animate-pulse-dot" />
            Toronto | Inaugural Season 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-display mt-6 text-[17vw] md:text-[10vw] leading-[0.85] tracking-tight"
          >
            The Real<br />
            <span className="text-trt-red">Toronto</span><br />
            Basketball<br />League
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 grid md:grid-cols-2 gap-10 items-end"
          >
            <p className="max-w-md text-white/70 text-sm md:text-base leading-relaxed">
              Toronto's professional basketball league.<br />
              <span className="text-white">6 Franchises | 2 Levels | 1 System</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/franchises"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] font-semibold bg-trt-red text-white hover:bg-white hover:text-black transition-all duration-300 rounded-xl"
              >
                Explore Franchises <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/membership"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] font-semibold border border-white/20 hover:border-white transition-all duration-300 rounded-xl"
              >
                TRT Membership <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Quick Stats Section ──────────────────────────── */
function QuickStatsSection() {
  const stats = [
    { n: "6", l: "Franchises" },
    { n: "2", l: "Levels" },
    { n: "GTA", l: "Markets" },
    { n: "2026", l: "Inaugural" },
  ];

  return (
    <section className="py-12 bg-black border-b border-white/10">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="border border-white/10 bg-white/[0.02] p-6 text-center">
                <span className="font-display text-4xl md:text-5xl text-trt-red block leading-none">{s.n}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-2 block">{s.l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Featured Story ───────────────────────────────── */
function FeaturedStory() {
  return (
    <section className="py-20 bg-black">
      <div className="container-x">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red mb-3">Featured</p>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-0 border border-white/10 bg-white/[0.01]">
          {/* Image */}
          <Reveal delay={0.05} className="md:col-span-7">
            <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-black relative">
              <img
                src={crowdImg}
                alt="TRT announcement"
                className="h-full w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:to-black/50" />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="p-8 md:p-12 flex flex-col justify-center h-full">
              <span className="text-[9px] uppercase tracking-[0.25em] text-trt-red border border-trt-red/40 px-3 py-1 w-fit">
                Announcement
              </span>
              <h2 className="font-display mt-6 text-3xl md:text-4xl leading-[0.95] text-balance">
                TRT unveils six founding franchise markets across the GTA
              </h2>
              <p className="mt-6 text-white/60 text-sm leading-relaxed">
                The Real Toronto Basketball League has confirmed its six founding franchises, bringing professional basketball to Brampton, Durham, Mississauga, Scarborough, Downtown, and Vaughan. The inaugural season tips off in 2026.
              </p>
              <Link
                to="/media"
                className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-white hover:text-trt-red transition-colors"
              >
                Read the full story <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Franchise Grid ───────────────────────────────── */
 function FranchiseGrid() {
  return (
    <section className="border-t border-white/10 py-20 bg-black relative">
      <div className="container-x">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red mb-3">Franchises</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.9] mb-10">
            Six Cities | One League
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {FRANCHISES.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.04}>
              <Link
                to="/franchises/$slug"
                params={{ slug: f.slug }}
                className="group block bg-black p-6 hover:bg-trt-red/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-trt-red flex items-center gap-1.5">
                      <MapPin size={10} /> {f.tag}
                    </p>
                    <h3 className="font-display mt-3 text-2xl leading-[0.95]">{f.city}</h3>
                    <p className="mt-1 text-sm text-white/50">{f.name}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/20 mt-1 group-hover:text-trt-red group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="mt-4 text-xs text-white/40 leading-relaxed truncate">{f.venue}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tickets Section ──────────────────────────────── */
function TicketsSection() {
  const matches = [
    { home: "Downtown Royals", away: "Brampton Kings", venue: "Downtown Arena District", date: "Jan 15, 2026", time: "7:30 PM" },
    { home: "Scarborough East", away: "Durham Storm", venue: "Scarborough Civic Centre", date: "Jan 17, 2026", time: "7:00 PM" },
    { home: "Vaughan Heights", away: "Mississauga Tide", venue: "Vaughan Performance Centre", date: "Jan 19, 2026", time: "6:30 PM" },
  ];

  return (
    <section className="border-t border-white/10 py-20 bg-black">
      <div className="container-x">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red mb-3">Game Access</p>
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display text-4xl md:text-5xl leading-[0.9]">Tickets</h2>
            <Link to="/membership" className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-trt-red transition-colors flex items-center gap-1.5">
              Founding memberships available <ArrowRight size={12} />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-4">
          {matches.map((m, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-white/10 bg-white/[0.01] hover:border-trt-red/30 transition-colors p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                  <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider">
                    <Calendar size={14} className="text-trt-red" />
                    <span>{m.date} | {m.time}</span>
                  </div>
                  <div className="h-px w-8 bg-white/10 hidden md:block" />
                  <div className="font-display text-2xl flex items-center gap-3">
                    <span>{m.home}</span>
                    <span className="text-white/40 text-sm font-sans italic">vs</span>
                    <span>{m.away}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-white/50 hidden lg:inline">{m.venue}</span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-trt-red px-5 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-white hover:text-black transition-colors"
                  >
                    <Ticket size={13} /> Get Tickets
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Store Section ────────────────────────────────── */
function StoreSection() {
  const products = [
    { name: "TRT Classic Hoodie", price: "$85.00", desc: "Heavyweight black fleece with embroidered red crest logo.", img: hoodieImg },
    { name: "TRT Monogram Cap", price: "$35.00", desc: "Structured 6-panel snapback featuring the clean shield emblem.", img: capImg },
    { name: "Royals Inaugural Jersey", price: "$110.00", desc: "Official home jersey for the Downtown Royals. Breathable mesh.", img: jerseyImg },
    { name: "TRT Composite Leather Ball", price: "$75.00", desc: "Indoor/Outdoor official size 7 composite leather match ball.", img: ballImg },
  ];

  return (
    <section className="border-t border-white/10 py-20 bg-black">
      <div className="container-x">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red mb-3">Official Merch</p>
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display text-4xl md:text-5xl leading-[0.9]">Store</h2>
            <span className="text-xs text-white/40">Inaugural release drops Fall 2025</span>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="border border-white/10 bg-white/[0.01] hover:border-trt-red/30 transition-colors p-6 flex flex-col h-full group">
                <div className="aspect-square bg-white/[0.02] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-trt-red bg-trt-red/10 border border-trt-red/20 px-2 py-0.5">
                    Pre-Order
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl leading-snug">{p.name}</h3>
                  <p className="mt-2 text-xs text-white/50 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-display text-lg text-trt-red">{p.price}</span>
                  <Link
                    to="/contact"
                    className="text-[10px] uppercase tracking-[0.15em] font-semibold text-white/80 hover:text-trt-red transition-colors"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Community Banner ─────────────────────────────── */
function CommunityBanner() {
  return (
    <section className="relative border-t border-white/10 py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={playerImg} alt="" className="h-full w-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black" />
      </div>
      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-trt-red mb-3">Community Hub</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.9]">
              The game | The city | The people
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-white/70 text-base leading-relaxed">
              TRT is more than a league. We are actively building clinics, rebuilding courts, hosting watch parties, and establishing youth development initiatives across all six franchise markets. Learn how you can get involved today.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                to="/community"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] font-semibold bg-trt-red text-white hover:bg-white hover:text-black transition-all"
              >
                Learn More & Volunteer <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
