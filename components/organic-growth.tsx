"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function OrganicGrowth() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-root-path]"));
    const leaves = Array.from(svg.querySelectorAll<SVGGElement>("[data-root-leaf]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.dataset.length = String(length);
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = reducedMotion ? "0" : String(length);
    });

    const render = () => {
      frame = 0;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, window.scrollY / scrollable));

      // WHY: estilos são escritos diretamente dentro de um único frame; assim o
      // scroll não dispara re-render React nem adiciona dependência de motion ao bundle.
      paths.forEach((path) => {
        const length = Number(path.dataset.length ?? 0);
        const start = Number(path.dataset.start ?? 0);
        const localProgress = Math.min(1, Math.max(0, (progress - start) / Math.max(0.01, 1 - start)));
        path.style.strokeDashoffset = String(length * (1 - localProgress));
      });

      leaves.forEach((leaf) => {
        const start = Number(leaf.dataset.start ?? 0);
        const localProgress = Math.min(1, Math.max(0, (progress - start) / 0.08));
        leaf.style.opacity = String(localProgress);
        leaf.style.transform = `scale(${0.65 + localProgress * 0.35})`;
      });
    };

    const requestRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    render();
    if (!reducedMotion) {
      window.addEventListener("scroll", requestRender, { passive: true });
      window.addEventListener("resize", requestRender, { passive: true });
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, [pathname]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 right-0 z-20 w-9 overflow-hidden text-accent opacity-35 [[data-theme=dark]_&]:opacity-25 sm:w-14 lg:w-24 lg:opacity-45 lg:[[data-theme=dark]_&]:opacity-30">
      <svg ref={svgRef} viewBox="0 0 120 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path data-root-path data-start="0" d="M108-20C104 68 112 121 98 194C84 266 102 337 86 408C70 478 90 552 74 626C59 698 77 769 61 839C52 881 54 933 45 1020" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path data-root-path data-start="0.13" d="M99 183C82 161 66 143 43 132C30 126 20 116 14 103" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path data-root-path data-start="0.29" d="M88 391C72 366 57 346 31 334C20 329 12 318 6 307" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path data-root-path data-start="0.47" d="M76 607C94 583 103 561 106 531C108 516 113 503 120 494" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path data-root-path data-start="0.66" d="M63 821C47 798 33 778 13 767C6 763 1 756-4 748" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

        <g data-root-leaf data-start="0.2" className="origin-center" style={{ transformBox: "fill-box" }}>
          <path d="M43 132C25 135 17 150 20 166C36 164 47 153 43 132Z" fill="currentColor" fillOpacity="0.23" stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </g>
        <g data-root-leaf data-start="0.39" className="origin-center" style={{ transformBox: "fill-box" }}>
          <path d="M31 334C14 338 8 352 12 368C27 364 36 352 31 334Z" fill="currentColor" fillOpacity="0.23" stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </g>
        <g data-root-leaf data-start="0.58" className="origin-center" style={{ transformBox: "fill-box" }}>
          <path d="M106 531C119 521 126 507 122 492C109 497 101 512 106 531Z" fill="currentColor" fillOpacity="0.23" stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </g>
        <g data-root-leaf data-start="0.79" className="origin-center" style={{ transformBox: "fill-box" }}>
          <path d="M13 767C-3 771-10 786-5 801C9 797 18 785 13 767Z" fill="currentColor" fillOpacity="0.23" stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}
