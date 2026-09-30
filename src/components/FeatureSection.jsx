import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: "Motion",
    desc: "Smooth, physics-based animation and interaction that feels alive in the browser.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    label: "Performance",
    desc: "Optimised transform-based animations that never cause layout reflow or jank.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: "Experience",
    desc: "Designed end-to-end for modern users with responsive layouts and accessibility in mind.",
  },
];

export default function FeatureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        ".feat-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: ".feat-heading",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card stagger
      gsap.fromTo(
        ".feat-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: ".feat-card-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--bg-2)" }}
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--cyan), transparent)", opacity: 0.2 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <p className="feat-heading font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--cyan)] mb-4" style={{ opacity: 0 }}>
          Built for Impact
        </p>

        {/* Section heading */}
        <h2
          className="feat-heading font-display font-black text-white leading-tight mb-16"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            letterSpacing: "-0.01em",
            opacity: 0,
          }}
        >
          Engineered for the
          <span
            className="block"
            style={{ color: "var(--cyan)", textShadow: "0 0 30px rgba(0,240,255,0.25)" }}
          >
            Next Generation.
          </span>
        </h2>

        {/* Cards */}
        <div className="feat-card-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, label, desc }) => (
            <article key={label} className="feat-card feature-card" style={{ opacity: 0 }}>
              {/* Icon */}
              <div
                className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center text-[var(--cyan)]"
                style={{
                  background: "rgba(0,240,255,0.06)",
                  border: "1px solid rgba(0,240,255,0.12)",
                  boxShadow: "0 0 20px rgba(0,240,255,0.05)",
                }}
              >
                {icon}
              </div>

              <h3 className="font-display font-bold text-white text-xl mb-3 tracking-tight">
                {label}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{desc}</p>

              {/* Bottom accent */}
              <div className="mt-8 flex items-center gap-3 text-[var(--cyan)] text-xs font-mono tracking-widest uppercase">
                <span>Learn more</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
      />
    </section>
  );
}
