"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import type { ProjectImage } from "@/lib/data/business";

interface ProjectGalleryProps {
  readonly images: readonly ProjectImage[];
  readonly projectTitle: string;
}

const placement = [
  "md:col-span-7",
  "md:col-span-5 md:mt-24",
  "md:col-span-5",
  "md:col-span-7 md:mt-16",
] as const;

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedIndex === null || !dialog) return;

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dialogRef.current?.close();
        setSelectedIndex(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images.length, selectedIndex]);

  const close = () => {
    dialogRef.current?.close();
    setSelectedIndex(null);
  };

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  return (
    <>
      <div className="grid items-start gap-x-6 gap-y-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16 lg:gap-x-12 lg:gap-y-24">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Ampliar imagem ${index + 1} de ${projectTitle}`}
            className={`reveal group block min-h-11 overflow-hidden bg-sage-pale text-left ${placement[index % placement.length]}`}
          >
            {/* WHY: width/height reais reservam a proporção antes do download e eliminam saltos de layout na galeria mobile. */}
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="h-auto w-full object-cover transition-transform duration-700 ease-organic group-hover:scale-[1.018]"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setSelectedIndex(null)}
        aria-label={`Visualização ampliada — ${projectTitle}`}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-surface-contrast p-0 text-content-onContrast backdrop:bg-surface-contrast/95"
      >
        {selectedImage && selectedIndex !== null && (
          <div className="flex h-full flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-stroke-onContrast/15 pb-3">
              <p aria-live="polite" className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-content-onContrast/65">
                {selectedIndex + 1} / {images.length} · {projectTitle}
              </p>
              <button type="button" onClick={close} autoFocus aria-label="Fechar imagem ampliada" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke-onContrast/30 text-content-onContrast transition-colors hover:border-stroke-onContrast hover:bg-petal hover:text-content-onLight">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 py-4 sm:py-6">
              <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="100vw" className="object-contain" />
            </div>

            <div className="flex min-h-14 items-center justify-between gap-4 border-t border-stroke-onContrast/15 pt-3">
              <button type="button" onClick={() => setSelectedIndex((selectedIndex - 1 + images.length) % images.length)} className="inline-flex min-h-11 items-center px-2 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-content-onContrast/72 transition-colors hover:text-content-onContrast">
                ← Anterior
              </button>
              <button type="button" onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)} className="inline-flex min-h-11 items-center px-2 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-content-onContrast/72 transition-colors hover:text-content-onContrast">
                Próxima →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
