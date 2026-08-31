"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

const STORAGE_KEY = "cm-theme";

type Theme = "light" | "dark";

function getActiveTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  themeMeta?.setAttribute("content", theme === "dark" ? "#111713" : "#F7F4EE");

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // O tema ainda é aplicado nesta sessão quando o storage está indisponível.
    }
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 320);
}

interface ThemeToggleProps {
  readonly inverse?: boolean;
}

export function ThemeToggle({ inverse = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getActiveTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        // Sem persistência, a preferência do sistema continua sendo a referência.
      }
      const nextTheme = event.matches ? "dark" : "light";
      applyTheme(nextTheme, false);
      setTheme(nextTheme);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const nextTheme = event.newValue === "dark" ? "dark" : "light";
      applyTheme(nextTheme, false);
      setTheme(nextTheme);
    };

    media.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={isDark}
      onClick={() => {
        const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
        setTheme(nextTheme);
      }}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
        inverse
          ? "border-stroke-onContrast/30 text-content-onContrast hover:border-stroke-onContrast/70"
          : "border-stroke-strong text-content hover:border-accent hover:text-accent"
      }`}
    >
      <SunIcon className="hidden h-[1.15rem] w-[1.15rem] [[data-theme=dark]_&]:block" />
      <MoonIcon className="h-[1.05rem] w-[1.05rem] [[data-theme=dark]_&]:hidden" />
    </button>
  );
}
