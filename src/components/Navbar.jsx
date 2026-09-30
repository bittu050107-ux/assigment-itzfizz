import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Initial nav entrance
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Scroll detection for backdrop
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Experience", "About"];

  const scrollToSection = (label) => {
    const map = {
      Home: "#hero",
      Experience: "#features",
      About: "#cta",
    };
    const el = document.querySelector(map[label]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(6,8,12,0.85)] backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            aria-label="ITZ FIZZ Home"
          >
            <div className="w-8 h-8 rounded-md bg-[var(--cyan)] flex items-center justify-center shadow-[0_0_16px_rgba(0,240,255,0.5)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M4 18L10 6H17L11 18H4Z" fill="#06080c" />
                <path d="M10 18L16 6H22L16 18H10Z" fill="rgba(6,8,12,0.5)" />
              </svg>
            </div>
            <span
              className="font-display font-black text-lg tracking-[0.15em] text-white group-hover:text-[var(--cyan)] transition-colors duration-300"
              style={{ letterSpacing: "0.15em" }}
            >
              ITZ FIZZ
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollToSection(link)}
                  className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--muted)] hover:text-[var(--cyan)] transition-colors duration-300 relative group bg-transparent border-0 cursor-pointer"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--cyan)] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("Experience")}
              className="hidden md:inline-flex btn-primary text-xs"
            >
              Explore
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-0 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block w-5 h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            mobileOpen ? "max-h-64" : "max-h-0"
          } bg-[rgba(6,8,12,0.97)] backdrop-blur-xl border-t border-white/5`}
        >
          <ul className="flex flex-col py-4 px-6 gap-4">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollToSection(link)}
                  className="font-mono text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--cyan)] transition-colors duration-300 bg-transparent border-0 cursor-pointer w-full text-left"
                >
                  {link}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection("Experience")}
                className="btn-primary text-xs w-full justify-center mt-2"
              >
                Explore
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
