"use client";

import { openConsentSettings } from "@/lib/privacy/consent";

interface CookieSettingsButtonProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export function CookieSettingsButton({
  className = "",
  children = "Preferências de cookies",
}: CookieSettingsButtonProps) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {children}
    </button>
  );
}
