import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.14 7.18L4 20l1.08-3.94A8.2 8.2 0 1 1 20.2 11.8Z" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.12 8.15c.18-.42.38-.43.56-.44h.48c.14 0 .37.05.56.47.2.43.67 1.64.73 1.76.06.12.1.26.02.41-.07.15-.11.24-.23.37-.11.13-.24.28-.34.38-.12.12-.23.25-.1.48.13.24.58.95 1.24 1.54.85.76 1.56 1 1.8 1.12.23.12.37.1.5-.06.14-.15.58-.67.73-.9.16-.24.31-.2.52-.13.22.08 1.36.65 1.6.76.23.12.39.18.45.28.06.1.06.58-.13 1.14-.19.56-1.12 1.08-1.54 1.15-.4.08-.93.11-1.5-.07-.35-.11-.8-.26-1.38-.51-.24-.1-4.05-1.5-5.54-5.2-.42-1.03-.01-1.84.1-2.06Z" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.45 8.3A1.74 1.74 0 1 0 6.44 4.8a1.74 1.74 0 0 0 0 3.49ZM5 9.7h2.9V19H5V9.7Zm4.75 0h2.78v1.27h.04c.38-.74 1.33-1.52 2.74-1.52 2.93 0 3.47 1.93 3.47 4.44V19h-2.9v-4.53c0-1.08-.02-2.47-1.5-2.47-1.51 0-1.74 1.18-1.74 2.39V19h-2.9V9.7Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8.2 4.2 10 8.35 7.9 10a15.5 15.5 0 0 0 6.1 6.1l1.65-2.1 4.15 1.8v3c0 .66-.54 1.2-1.2 1.2C10.54 20 4 13.46 4 5.4c0-.66.54-1.2 1.2-1.2h3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
