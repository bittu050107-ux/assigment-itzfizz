import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      id="cta"
      className="relative py-36 overflow-hidden"
      style={{ background: "var(--bg-3)" }}
    >
      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,240,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.2), transparent)" }}
      />

      <div className="cta-content relative z-10 max-w-3xl mx-auto px-6 text-center" style={{ opacity: 0 }}>
        {/* Eyebrow */}
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--cyan)] mb-6">
          Ready to Begin
        </p>

        <h2
          className="font-display font-black text-white leading-[1.05] mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}
        >
          LET'S CREATE SOMETHING
          <span
            className="block"
            style={{ color: "var(--cyan)", textShadow: "0 0 40px rgba(0,240,255,0.3)" }}
          >
            THAT MOVES.
          </span>
        </h2>

        <p className="text-[var(--muted)] text-base lg:text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          Push the boundaries of modern web interaction with scroll-driven animations
          that leave a lasting impression.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.querySelector("#scroll-visual")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Explore Experience
          </button>

          <button
            onClick={() => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-ghost text-sm"
          >
            Back to Top
          </button>
        </div>
      </div>
    </section>
  );
}
