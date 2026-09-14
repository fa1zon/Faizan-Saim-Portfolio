export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 3h4.2l5 6.6L17.6 3H21l-7.1 8.3L21.4 21h-4.2l-5.3-7-6 7H2.5l7.6-8.9L3 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BehanceIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2.5 5.5h5.2c2 0 3.2.9 3.2 2.6 0 1.2-.6 1.9-1.6 2.3 1.3.3 2.1 1.2 2.1 2.7 0 2-1.4 3.2-3.7 3.2H2.5v-10.8Zm2.3 4.3h2.5c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1H4.8v2.2Zm0 4.5h2.7c1 0 1.6-.4 1.6-1.2 0-.8-.6-1.2-1.6-1.2H4.8v2.4Z"
        fill="currentColor"
      />
      <path d="M14.4 6.6h5.4v1.5h-5.4z" fill="currentColor" />
      <path
        d="M17.2 9.4c2.2 0 3.6 1.6 3.6 3.9v.6h-5.3c.1 1 .8 1.6 1.8 1.6.8 0 1.3-.3 1.6-.9h1.8c-.4 1.6-1.7 2.5-3.4 2.5-2.3 0-3.8-1.6-3.8-3.9s1.5-3.8 3.7-3.8Zm-1.7 3.1h3.4c-.1-.9-.7-1.5-1.7-1.5-.9 0-1.5.6-1.7 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const socialIcons = {
  instagram: InstagramIcon,
  x: XIcon,
  behance: BehanceIcon,
} as const;
