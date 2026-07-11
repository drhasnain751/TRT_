import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { TrtLogo } from "./TrtLogo";

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
  { to: "/sponsors", label: "Sponsors" },
  { to: "/investors", label: "Investors" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact Us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [franchiseOpen, setFranchiseOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500">
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        {/* Branded TRT Shield Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="TRT home">
          <TrtLogo className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl tracking-[0.06em] leading-none">THE REAL</span>
            <span className="font-display text-xs tracking-[0.25em] text-trt-red mt-0.5 leading-none">TORONTO</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
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
                    className="flex items-center gap-1 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
                    activeProps={{ className: "text-white" }}
                  >
                    {l.label}
                    <ChevronDown size={11} className={`transition-transform duration-200 ${franchiseOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {franchiseOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-black border border-white/10 py-2 shadow-2xl">
                      {FRANCHISE_LINKS.map((f) => (
                        <Link
                          key={f.slug}
                          to="/franchises/$slug"
                          params={{ slug: f.slug }}
                          className="block px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {f.city}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
                activeProps={{ className: "text-white" }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-white"
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black">
          <div className="container-x py-6 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 font-display text-2xl tracking-wide text-white/80 hover:text-trt-red"
              activeProps={{ className: "text-trt-red" }}
            >
              Home
            </Link>
            {/* Franchises with sub */}
            <div>
              <Link
                to="/franchises"
                onClick={() => setOpen(false)}
                className="py-3 font-display text-2xl tracking-wide text-white/80 hover:text-trt-red block"
              >
                Franchises
              </Link>
              <div className="pl-4 flex flex-col gap-1">
                {FRANCHISE_LINKS.map((f) => (
                  <Link
                    key={f.slug}
                    to="/franchises/$slug"
                    params={{ slug: f.slug }}
                    onClick={() => setOpen(false)}
                    className="py-2 text-[12px] uppercase tracking-[0.18em] text-white/50 hover:text-trt-red"
                  >
                    {f.city}
                  </Link>
                ))}
              </div>
            </div>
            {[
              // { to: "/membership", label: "TRT Membership" },
              { to: "/the-24", label: "The 24" },
              { to: "/sponsors", label: "Sponsors" },
              { to: "/investors", label: "Investors" },
              { to: "/community", label: "Community" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-2xl tracking-wide text-white/80 hover:text-trt-red"
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
