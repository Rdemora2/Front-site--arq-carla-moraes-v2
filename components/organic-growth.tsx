"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type GrowthKind = "trunk" | "branch" | "detail";

interface GrowthPath {
  readonly d: string;
  readonly start: number;
  readonly end: number;
  readonly kind: GrowthKind;
}

interface GrowthLeaf {
  readonly shape: string;
  readonly vein: string;
  readonly start: number;
  readonly end: number;
  readonly detail?: boolean;
}

interface GrowthNode {
  readonly cx: number;
  readonly cy: number;
  readonly start: number;
  readonly detail?: boolean;
}

const growthPaths: readonly GrowthPath[] = [
  {
    d: "M73-24C70 72 77 126 68 202C59 278 70 341 58 416C47 491 59 551 46 628C34 706 46 776 31 852C23 903 26 958 17 1024",
    start: 0,
    end: 1,
    kind: "trunk",
  },
  { d: "M69 176C56 161 45 145 29 136C20 131 15 123 11 114", start: 0.11, end: 0.2, kind: "branch" },
  { d: "M39 143C28 148 20 158 17 171", start: 0.155, end: 0.215, kind: "detail" },
  { d: "M61 363C48 347 37 333 21 325C12 321 7 313 3 304", start: 0.27, end: 0.385, kind: "branch" },
  { d: "M31 331C21 341 17 353 18 367", start: 0.32, end: 0.4, kind: "detail" },
  { d: "M51 573C62 555 69 536 71 510C72 497 75 486 79 477", start: 0.43, end: 0.565, kind: "branch" },
  { d: "M68 531C58 520 54 507 54 491", start: 0.49, end: 0.575, kind: "detail" },
  { d: "M39 742C27 728 18 716 5 710C1 708-2 704-5 699", start: 0.62, end: 0.72, kind: "branch" },
  { d: "M19 718C13 729 11 741 13 753", start: 0.67, end: 0.735, kind: "detail" },
  { d: "M29 862C41 848 50 831 55 808C59 794 66 783 76 776", start: 0.765, end: 0.875, kind: "branch" },
  { d: "M53 818C46 808 43 797 44 785", start: 0.81, end: 0.885, kind: "detail" },
  { d: "M21 947C13 937 7 928-2 922", start: 0.89, end: 0.965, kind: "branch" },
] as const;

const growthLeaves: readonly GrowthLeaf[] = [
  { shape: "M11 114C6 99 13 87 27 83C31 98 24 110 11 114Z", vein: "M12 112C17 104 21 96 26 87", start: 0.18, end: 0.225 },
  { shape: "M17 171C8 163 8 150 15 141C25 149 26 162 17 171Z", vein: "M17 168C17 159 17 151 16 144", start: 0.205, end: 0.245, detail: true },
  { shape: "M3 304C0 289 8 278 22 276C24 291 16 302 3 304Z", vein: "M5 302C10 293 15 285 21 279", start: 0.365, end: 0.41 },
  { shape: "M18 367C8 359 7 346 15 336C25 344 27 357 18 367Z", vein: "M18 364C18 355 17 346 16 339", start: 0.39, end: 0.43, detail: true },
  { shape: "M79 477C66 480 57 472 56 459C69 456 79 464 79 477Z", vein: "M76 476C70 469 64 464 59 461", start: 0.545, end: 0.59 },
  { shape: "M54 491C44 483 44 470 52 461C62 469 63 482 54 491Z", vein: "M54 488C54 479 54 471 53 464", start: 0.565, end: 0.605, detail: true },
  { shape: "M5 710C0 696 6 684 19 680C24 694 18 706 5 710Z", vein: "M7 708C11 699 15 690 18 683", start: 0.7, end: 0.745 },
  { shape: "M76 776C63 778 54 769 54 757C67 754 76 763 76 776Z", vein: "M73 775C68 768 62 763 57 759", start: 0.855, end: 0.9 },
  { shape: "M44 785C34 777 34 765 41 756C51 764 53 776 44 785Z", vein: "M44 782C44 774 43 766 42 759", start: 0.875, end: 0.915, detail: true },
  { shape: "M1 922C0 907 8 897 21 896C23 910 15 920 1 922Z", vein: "M4 920C9 912 14 904 20 899", start: 0.945, end: 0.985 },
] as const;

const growthNodes: readonly GrowthNode[] = [
  { cx: 69, cy: 176, start: 0.16 },
  { cx: 61, cy: 363, start: 0.345 },
  { cx: 51, cy: 573, start: 0.555 },
  { cx: 39, cy: 742, start: 0.72 },
  { cx: 29, cy: 862, start: 0.85 },
  { cx: 68, cy: 531, start: 0.56, detail: true },
] as const;

type OrganicTone = "light" | "gold" | "dark";
const TONE_SAMPLE_INTERVAL_MS = 125;

function getBackgroundTone(): OrganicTone {
  const sampleX = Math.max(1, window.innerWidth - 12);
  const sampleY = Math.round(window.innerHeight * 0.48);
  let element = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;

  const explicitTone = element?.closest<HTMLElement>("[data-organic-tone]")?.dataset.organicTone;
  if (explicitTone === "light" || explicitTone === "gold" || explicitTone === "dark") return explicitTone;

  while (element) {
    const color = window.getComputedStyle(element).backgroundColor;
    const channels = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);

    if (channels && Number(channels[4] ?? 1) > 0.08) {
      const red = Number(channels[1]);
      const green = Number(channels[2]);
      const blue = Number(channels[3]);
      const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
      const chroma = (Math.max(red, green, blue) - Math.min(red, green, blue)) / 255;

      if (luminance < 0.32) return "dark";
      if (chroma > 0.11 && red > green && green > blue) return "gold";
      return "light";
    }

    element = element.parentElement;
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function OrganicGrowth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-organic-path]"));
    const leaves = Array.from(svg.querySelectorAll<SVGGElement>("[data-organic-leaf]"));
    const nodes = Array.from(svg.querySelectorAll<SVGGElement>("[data-organic-node]"));
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let reducedMotion = reducedMotionQuery.matches;
    let frame = 0;
    let trailingToneTimer = 0;
    let lastToneSample = Number.NEGATIVE_INFINITY;
    let previousProgress = Number.NaN;
    let scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.dataset.length = String(length);
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = reducedMotion ? "0" : String(length);
    });

    const render = (timestamp = performance.now()) => {
      frame = 0;
      const rawProgress = window.scrollY / scrollable;
      const progress = reducedMotion ? 1 : Math.min(1, Math.max(0.025, rawProgress));

      // WHY: elementFromPoint/getComputedStyle podem forçar cálculo de estilo.
      // Amostrar no máximo 8 vezes/s mantém a troca de contraste perceptualmente
      // contínua sem colocar essa leitura síncrona em todo frame de scroll.
      if (timestamp - lastToneSample >= TONE_SAMPLE_INTERVAL_MS) {
        if (trailingToneTimer) {
          window.clearTimeout(trailingToneTimer);
          trailingToneTimer = 0;
        }
        lastToneSample = timestamp;
        const tone = getBackgroundTone();
        if (container.dataset.tone !== tone) container.dataset.tone = tone;
      } else if (!trailingToneTimer) {
        // WHY: preserva uma amostra final depois que o scroll para; sem este
        // trailing call, a raiz poderia manter o contraste da seção anterior.
        const remaining = TONE_SAMPLE_INTERVAL_MS - (timestamp - lastToneSample);
        trailingToneTimer = window.setTimeout(() => {
          trailingToneTimer = 0;
          lastToneSample = Number.NEGATIVE_INFINITY;
          requestRender();
        }, remaining);
      }

      // WHY: todos os estilos são escritos no mesmo frame; o scroll não provoca
      // re-render React e o bundle continua sem uma biblioteca de motion.
      if (progress !== previousProgress) {
        previousProgress = progress;
        paths.forEach((path) => {
          const length = Number(path.dataset.length ?? 0);
          const start = Number(path.dataset.start ?? 0);
          const end = Number(path.dataset.end ?? 1);
          const localProgress = Math.min(1, Math.max(0, (progress - start) / Math.max(0.01, end - start)));
          path.style.strokeDashoffset = String(length * (1 - localProgress));
        });

        leaves.forEach((leaf) => {
          const start = Number(leaf.dataset.start ?? 0);
          const end = Number(leaf.dataset.end ?? start + 0.05);
          const localProgress = Math.min(1, Math.max(0, (progress - start) / Math.max(0.01, end - start)));
          leaf.style.opacity = String(localProgress);
          leaf.style.transform = `scale(${0.55 + localProgress * 0.45})`;
        });

        nodes.forEach((node) => {
          const start = Number(node.dataset.start ?? 0);
          const localProgress = Math.min(1, Math.max(0, (progress - start) / 0.035));
          node.style.opacity = String(localProgress);
          node.style.transform = `scale(${0.6 + localProgress * 0.4})`;
        });

        const drift = desktopQuery.matches && !reducedMotion ? (progress - 0.5) * 8 : 0;
        svg.style.setProperty("--organic-drift", `${drift.toFixed(2)}px`);
      }
    };

    const requestRender = () => {
      if (frame) return;

      const elapsedSinceToneSample = performance.now() - lastToneSample;
      if (reducedMotion && elapsedSinceToneSample < TONE_SAMPLE_INTERVAL_MS) {
        if (!trailingToneTimer) {
          trailingToneTimer = window.setTimeout(() => {
            trailingToneTimer = 0;
            lastToneSample = Number.NEGATIVE_INFINITY;
            requestRender();
          }, TONE_SAMPLE_INTERVAL_MS - elapsedSinceToneSample);
        }
        return;
      }

      frame = window.requestAnimationFrame(render);
    };

    const handleReducedMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      previousProgress = Number.NaN;
      lastToneSample = Number.NEGATIVE_INFINITY;
      requestRender();
    };

    const handleResize = () => {
      scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      lastToneSample = Number.NEGATIVE_INFINITY;
      requestRender();
    };

    const handleThemeChange = () => {
      lastToneSample = Number.NEGATIVE_INFINITY;
      requestRender();
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const sizeObserver = new ResizeObserver(handleResize);
    sizeObserver.observe(document.documentElement);

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotionQuery.addEventListener("change", handleReducedMotion);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (trailingToneTimer) window.clearTimeout(trailingToneTimer);
      themeObserver.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotion);
    };
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      data-organic-growth
      data-tone="auto"
      aria-hidden="true"
      className="organic-growth pointer-events-none fixed inset-y-0 z-20 w-12 overflow-hidden sm:w-16 lg:w-[4.5rem]"
    >
      <svg ref={svgRef} viewBox="0 0 80 1000" preserveAspectRatio="none" className="organic-growth__canvas h-full w-full overflow-visible">
        <g className="organic-growth__drift">
          {growthPaths.map((path, index) => (
            <g key={`${path.d}-${index}`} className={path.kind === "detail" ? "organic-growth__detail" : undefined}>
              <path data-organic-path data-kind={path.kind} data-start={path.start} data-end={path.end} d={path.d} className="organic-growth__halo" vectorEffect="non-scaling-stroke" />
              <path data-organic-path data-kind={path.kind} data-start={path.start} data-end={path.end} d={path.d} className="organic-growth__line" vectorEffect="non-scaling-stroke" />
            </g>
          ))}

          {growthLeaves.map((leaf, index) => (
            <g
              key={`${leaf.shape}-${index}`}
              data-organic-leaf
              data-detail={leaf.detail ? "true" : undefined}
              data-start={leaf.start}
              data-end={leaf.end}
              className="organic-growth__leaf"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <path d={leaf.shape} className="organic-growth__leaf-shape" vectorEffect="non-scaling-stroke" />
              <path d={leaf.vein} className="organic-growth__leaf-vein" vectorEffect="non-scaling-stroke" />
            </g>
          ))}

          {growthNodes.map((node, index) => (
            <g
              key={`${node.cx}-${node.cy}-${index}`}
              data-organic-node
              data-detail={node.detail ? "true" : undefined}
              data-start={node.start}
              className="organic-growth__node"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle cx={node.cx} cy={node.cy} r="3.2" className="organic-growth__node-halo" vectorEffect="non-scaling-stroke" />
              <circle cx={node.cx} cy={node.cy} r="1.35" className="organic-growth__node-core" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
