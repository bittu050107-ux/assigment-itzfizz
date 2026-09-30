export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Home",      href: "#hero" },
    { label: "Experience", href: "#scroll-visual" },
    { label: "Features",   href: "#features" },
    { label: "About",      href: "#cta" },
  ];

  return (
    <footer
      className="relative py-12 border-t"
      style={{ background: "#06080c", borderColor: "var(--border)" }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span
              className="font-display font-black text-xl tracking-[0.15em] text-white"
            >
              ITZ FIZZ
            </span>
            <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
              © {year} ITZ FIZZ. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--muted)] hover:text-[var(--cyan)] transition-colors duration-300"
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tech badge */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">
              Built with
            </span>
            <span
              className="font-mono text-[10px] tracking-widest uppercase text-[var(--cyan)] px-2 py-1 rounded"
              style={{ border: "1px solid rgba(0,240,255,0.2)", background: "rgba(0,240,255,0.04)" }}
            >
              GSAP + React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
