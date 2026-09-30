import { useEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
  { value: "95%", label: "Customer Satisfaction", delay: 0 },
  { value: "80%", label: "Faster Growth",          delay: 0.12 },
  { value: "50K+", label: "Happy Users",            delay: 0.24 },
];

export default function Stats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 1.4,   // after headline animation completes
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6"
    >
      {STATS.map(({ value, label }) => (
        <div key={label} className="stat-item stat-card flex-1 min-w-0" style={{ opacity: 0 }}>
          <p
            className="font-display font-black text-3xl lg:text-4xl text-[var(--cyan)] leading-none tracking-tight"
            style={{ textShadow: "0 0 20px rgba(0,240,255,0.4)" }}
          >
            {value}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
