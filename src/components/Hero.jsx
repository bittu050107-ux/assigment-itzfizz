import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "./Stats";
import heroCar from "../assets/hero-object.png";

gsap.registerPlugin(ScrollTrigger);

/* Letter-by-letter split for the headline */
function SplitLetters({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="letter inline-block"
          style={{ opacity: 0, transform: "translateY(60px)" }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const subRef      = useRef(null);
  const ctaRef      = useRef(null);
  const carWrapRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Skip animations for users who prefer reduced motion
        gsap.set(".letter, .eyebrow-el, .sub-el, .cta-el, .car-el, .stat-item", {
          opacity: 1, y: 0, scale: 1,
        });
        return;
      }

      // Master timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0
      );

      // HEADLINE — staggered letter reveal
      tl.fromTo(
        ".letter",
        { opacity: 0, y: 60, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "expo.out",
        },
        0.25
      );

      // Supporting text
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.9
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.05
      );

      // Car image entrance
      tl.fromTo(
        carWrapRef.current,
        { opacity: 0, x: 60, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power2.out" },
        0.4
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise"
      style={{
        background: "radial-gradient(ellipse 120% 80% at 70% 60%, rgba(0,240,255,0.04) 0%, transparent 65%), #06080c",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

      {/* Large background glow */}
      <div
        className="glow-orb pointer-events-none"
        style={{
          width: "700px", height: "700px",
          top: "-100px", right: "-200px",
          background: "rgba(0,240,255,0.04)",
        }}
      />
      <div
        className="glow-orb pointer-events-none"
        style={{
          width: "400px", height: "400px",
          bottom: "10%", left: "-100px",
          background: "rgba(0,240,255,0.03)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">

          {/* Left column — text */}
          <div className="flex-1 max-w-2xl">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="eyebrow-el inline-flex items-center gap-3 mb-8"
              style={{ opacity: 0 }}
            >
              <span className="w-6 h-px bg-[var(--cyan)]" />
              <span
                className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--cyan)]"
              >
                Digital Experience
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black leading-none mb-8"
              style={{ perspective: "600px" }}
            >
              <span className="block text-white" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)", letterSpacing: "0.18em", lineHeight: 1.1 }}>
                <SplitLetters text="WELCOME" className="block mb-2" />
                <SplitLetters
                  text="ITZ FIZZ"
                  className="block"
                />
              </span>
            </h1>

            {/* Cyan accent bar */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{ background: "linear-gradient(90deg, var(--cyan), transparent)" }}
              />
            </div>

            {/* Supporting text */}
            <p
              ref={subRef}
              className="text-[var(--muted)] text-base lg:text-lg leading-relaxed max-w-md mb-10"
              style={{ opacity: 0 }}
            >
              Create memorable digital experiences through motion,
              interaction and modern design.
            </p>

            {/* CTA buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4 mb-12"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => document.querySelector("#scroll-visual")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Experience It
              </button>
              <button
                onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <Stats />
          </div>

          {/* Right column — car image (desktop only accent) */}
          <div
            ref={carWrapRef}
            className="hidden lg:block flex-shrink-0"
            style={{ opacity: 0, width: "clamp(320px, 38vw, 580px)" }}
            aria-hidden="true"
          >
            <img
              src={heroCar}
              alt="ITZ FIZZ futuristic hypercar"
              draggable={false}
              className="w-full h-auto object-contain select-none"
              style={{
                filter: "drop-shadow(0 20px 60px rgba(0,240,255,0.3)) drop-shadow(0 0 100px rgba(0,240,255,0.1))",
              }}
            />
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--cyan)] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
