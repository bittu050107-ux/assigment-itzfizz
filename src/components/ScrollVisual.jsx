import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroCar from "../assets/hero-object.png";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollVisual — the hero car that scrubs with scroll.
 *
 * Layout:  The parent section is 300vh tall (scroll-space).
 * The inner `.scroll-track` is sticky at 100vh, so the viewport
 * is pinned while the user scrolls through 200vh of extra space.
 *
 * Animation keyframes (scroll progress 0 → 1):
 *  0%   → car starts center-left, full opacity
 *  40%  → car moves right + slight scale-down + -4deg rotate
 *  70%  → car continues right, scale 0.7, -8deg
 *  100% → car exits right edge, faded slightly
 */
export default function ScrollVisual() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const carRef     = useRef(null);
  const trailRef   = useRef(null);
  const glowRef    = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const isMobile = vw < 640;

      // Travel distance: car moves from its initial position to the right
      const travelX = isMobile ? vw * 0.55 : vw * 0.62;

      // Ensure clean initial state (important after a page refresh mid-scroll)
      gsap.set(carRef.current, { x: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(trailRef.current, { scaleX: 0 });
      gsap.set(glowRef.current, { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: trackRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl
        // Phase 1 (0–50%): move right + subtle rotate
        .to(carRef.current, {
          x: travelX * 0.55,
          rotation: -4,
          scale: 0.9,
          ease: "none",
        }, 0)
        // Phase 2 (50–80%): continue right, more rotation, slight scale
        .to(carRef.current, {
          x: travelX * 0.85,
          rotation: -7,
          scale: 0.75,
          ease: "none",
        }, 0.5)
        // Phase 3 (80–100%): exit with fade
        .to(carRef.current, {
          x: travelX,
          rotation: -10,
          scale: 0.65,
          opacity: 0.4,
          ease: "none",
        }, 0.8);

      // Trail (the glowing line that follows the car)
      tl.to(trailRef.current, { scaleX: 1, ease: "none" }, 0);

      // Glow orb that follows the car subtly
      tl.to(glowRef.current, {
        x: travelX,
        ease: "none",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-visual"
      className="relative"
      style={{ height: "300vh" }}
      aria-label="Scroll-driven car animation"
    >
      {/* Sticky track — always visible in viewport */}
      <div
        ref={trackRef}
        className="sticky top-0 w-full overflow-hidden grid-lines"
        style={{ height: "100vh" }}
      >
        {/* Background ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,240,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Road / track strip */}
        <div
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: "54%",
            height: "4px",
            background: "rgba(0,240,255,0.08)",
          }}
        >
          {/* Glow trail that expands as car moves — initial scaleX set via gsap.set in useEffect */}
          <div
            ref={trailRef}
            className="absolute left-0 top-0 h-full origin-left"
            style={{
              width: "100%",
              transform: "scaleX(0)",
              background: "linear-gradient(90deg, rgba(0,240,255,0.6), rgba(0,240,255,0.1))",
              boxShadow: "0 0 12px rgba(0,240,255,0.5)",
            }}
          />
        </div>

        {/* Glow orb that follows car */}
        <div
          ref={glowRef}
          className="glow-orb"
          style={{
            width: "400px",
            height: "200px",
            bottom: "30%",
            left: "calc(15% - 200px)",
            background: "rgba(0,240,255,0.07)",
            transform: "translateX(0)",
          }}
        />

        {/* Dashed lane markers */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: "53.8%", height: "2px" }}
        >
          <svg width="100%" height="2" preserveAspectRatio="none">
            <line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="rgba(0,240,255,0.15)"
              strokeWidth="1"
              strokeDasharray="40 30"
            />
          </svg>
        </div>

        {/* SECTION LABEL */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--muted)]">
            Scroll to experience
          </p>
          <div className="mt-2 flex justify-center">
            <div className="w-px h-8 bg-gradient-to-b from-[var(--cyan)] to-transparent" />
          </div>
        </div>

        {/* THE CAR */}
        <div
          ref={carRef}
          className="absolute"
          style={{
            bottom: "calc(54% - 10px)",
            left: "15%",
            transform: "translateX(0) rotate(0deg)",
            willChange: "transform, opacity",
          }}
        >
          <img
            src={heroCar}
            alt="Futuristic hypercar top-view — ITZ FIZZ"
            draggable={false}
            className="select-none"
            style={{
              width: "clamp(260px, 38vw, 560px)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 10px 40px rgba(0,240,255,0.25)) drop-shadow(0 0 80px rgba(0,240,255,0.1))",
            }}
          />
        </div>

        {/* Speed lines when car moves — purely decorative */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          style={{ mixBlendMode: "screen" }}
          aria-hidden="true"
        >
          {[0.42, 0.44, 0.46, 0.5, 0.52].map((y, i) => (
            <line
              key={i}
              x1="0%" y1={`${y * 100}%`}
              x2="14%" y2={`${y * 100}%`}
              stroke="rgba(0,240,255,0.4)"
              strokeWidth={i === 2 ? 1.5 : 0.5}
              strokeDasharray={i % 2 === 0 ? "8 6" : "5 10"}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
