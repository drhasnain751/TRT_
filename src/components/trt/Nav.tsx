import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { TrtLogo } from "./TrtLogo";
import { UPCOMING_GAMES, FRANCHISES } from "../../lib/trt-data";

const FRANCHISE_LINKS = [
  { slug: "brampton", city: "Brampton" },
  { slug: "durham", city: "Durham" },
  { slug: "mississauga", city: "Mississauga" },
  { slug: "scarborough", city: "Scarborough" },
  { slug: "downtown-toronto", city: "Downtown" },
  { slug: "vaughan", city: "Vaughan" },
];

interface NavLinkItem {
  to: string;
  label: string;
  hasSub?: boolean;
}

const navLinks: readonly NavLinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/franchises", label: "Franchises", hasSub: true },
  // { to: "/membership", label: "TRT Membership" },
  { to: "/the-24", label: "The 24" },
  { to: "/store", label: "Apparel" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/investors", label: "Investors" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact Us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [franchiseOpen, setFranchiseOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const setHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty("--header-height", `${headerRef.current.offsetHeight}px`);
      }
    };
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    document.documentElement.style.setProperty("--header-height", `${headerRef.current.offsetHeight}px`);
  }, [scrolled]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(0,0,0,0.92)"
          : "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(220,38,38,0.15)" : "none",
      }}
    >
      {/* Red glow line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.6) 30%, rgba(220,38,38,0.8) 50%, rgba(220,38,38,0.6) 70%, transparent)",
          opacity: scrolled ? 1 : 0,
        }}
      />

      {/* Games Ticker */}
      <div className={`border-b border-white/8 overflow-hidden transition-all duration-400 ${scrolled ? "max-h-0 border-0 opacity-0" : "max-h-[240px] opacity-100"}`}
        style={{ background: "rgba(0,0,0,0.4)" }}>
        <div className="px-4 py-3 flex gap-3 min-w-min">
          {UPCOMING_GAMES.map((game) => {
            const gameKey = `${game.home}_${game.away}`;

            return (
              <div
                key={gameKey}
                className="flex-shrink-0 w-72 rounded-lg p-3 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-center mb-2">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-white/50 font-semibold">Pro Am Showcase</p>
                  <p className="text-[8px] uppercase tracking-[0.1em] text-trt-red font-bold">Upcoming</p>
                </div>
                <div className="space-y-2 mb-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-xs font-bold text-white uppercase flex-1 truncate">{game.home}</div>
                    <div className="text-2xl font-bold text-white">{game.homeScore ?? 0}</div>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-xs font-bold text-white uppercase flex-1 truncate">{game.away}</div>
                    <div className="text-2xl font-bold text-white">{game.awayScore ?? 0}</div>
                  </div>
                </div>
                <div className="text-[9px] text-white/60 text-center mb-2 pb-2 border-t border-white/10">
                  <div className="text-[10px] font-semibold text-white truncate">{game.venue}</div>
                  <div className="text-[8px] text-white/40 mt-1">{game.date} — Doors open {game.doors} • Tip off {game.tipoff}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main nav bar */}
      <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="TRT home">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              style={{ background: "rgba(220,38,38,0.4)" }}
            />
            <TrtLogo className={`w-auto relative z-10 transition-all duration-300 group-hover:scale-105 ${scrolled ? "h-8 md:h-10" : "h-10 md:h-12"}`} />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-display tracking-[0.06em] leading-none transition-all duration-300 ${scrolled ? "text-base" : "text-lg md:text-xl"}`}
              style={{ background: "linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.7))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              THE REAL
            </span>
            <span className={`font-display tracking-[0.25em] text-trt-red mt-0.5 leading-none transition-all duration-300 ${scrolled ? "text-[10px]" : "text-xs"}`}>
              TORONTO
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.slice(1).map((l) => {
            if (l.hasSub) {
              return (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setFranchiseOpen(true)}
                  onMouseLeave={() => setFranchiseOpen(false)}
                >
                  <Link
                    to={l.to}
                    className="group relative flex items-center gap-1 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-all duration-200"
                    activeProps={{ className: "text-white" }}
                  >
                    <span className="relative">
                      {l.label}
                      <span
                        className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "linear-gradient(90deg, #dc2626, rgba(220,38,38,0.3))" }}
                      />
                    </span>
                    <ChevronDown size={11} className={`transition-transform duration-200 ${franchiseOpen ? "rotate-180 text-trt-red" : ""}`} />
                  </Link>

                  {franchiseOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-52 py-2 shadow-2xl"
                      style={{
                        background: "rgba(5,5,5,0.97)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderTop: "1px solid rgba(220,38,38,0.4)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(220,38,38,0.1)",
                      }}
                    >
                      <div className="px-3 pb-2 mb-1 border-b border-white/5">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-trt-red/70">Select Franchise</p>
                      </div>
                      {FRANCHISE_LINKS.map((f) => (
                        <Link
                          key={f.slug}
                          to="/franchises/$slug"
                          params={{ slug: f.slug }}
                          className="group flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/5 transition-all duration-150"
                        >
                          <span
                            className="h-1 w-1 rounded-full bg-trt-red opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          {f.city}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isContact = l.to === "/contact";

            if (isContact) {
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="ml-2 px-4 py-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                    borderRadius: "4px",
                    boxShadow: "0 0 20px rgba(220,38,38,0.3)",
                  }}
                  activeProps={{ className: "opacity-90" }}
                >
                  {l.label}
                </Link>
              );
            }

            return (
              <Link
                key={l.to}
                to={l.to}
                className="group relative px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-all duration-200"
                activeProps={{ className: "text-white" }}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: "linear-gradient(90deg, #dc2626, rgba(220,38,38,0.3))" }}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          <div
            className="p-1.5 rounded-md transition-all"
            style={{ background: open ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{
            background: "rgba(0,0,0,0.98)",
            backdropFilter: "blur(30px)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="container-x py-8 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 font-display text-2xl tracking-wide text-white/80 hover:text-trt-red transition-colors border-b border-white/5"
              activeProps={{ className: "text-trt-red" }}
            >
              Home
            </Link>

            {/* Franchises with sub */}
            <div className="border-b border-white/5">
              <Link
                to="/franchises"
                onClick={() => setOpen(false)}
                className="py-3 font-display text-2xl tracking-wide text-white/80 hover:text-trt-red transition-colors block"
              >
                Franchises
              </Link>
              <div className="pl-4 pb-3 flex flex-col gap-1">
                {FRANCHISE_LINKS.map((f) => (
                  <Link
                    key={f.slug}
                    to="/franchises/$slug"
                    params={{ slug: f.slug }}
                    onClick={() => setOpen(false)}
                    className="py-1.5 text-[12px] uppercase tracking-[0.18em] text-white/40 hover:text-trt-red transition-colors"
                  >
                    {f.city}
                  </Link>
                ))}
              </div>
            </div>

            {[
              // { to: "/membership", label: "TRT Membership" },
              { to: "/the-24", label: "The 24" },
              { to: "/store", label: "Apparel" },
              { to: "/sponsors", label: "Sponsors" },
              { to: "/investors", label: "Investors" },
              { to: "/community", label: "Community" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-2xl tracking-wide text-white/80 hover:text-trt-red transition-colors border-b border-white/5 last:border-0"
                activeProps={{ className: "text-trt-red" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
