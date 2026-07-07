import { business } from "@/lib/business";

// Social icon links. URLs live in `business.social` (src/lib/business.ts) —
// icons only render for platforms with a non-empty URL, so blanks are hidden.

type IconProps = { className?: string };

const GoogleIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M21.35 11.1H12v2.9h5.35c-.5 2.5-2.62 3.9-5.35 3.9a6 6 0 1 1 0-12c1.48 0 2.83.53 3.89 1.41l2.17-2.17A9 9 0 1 0 12 21c4.6 0 8.8-3.34 8.8-9 0-.31-.02-.61-.09-.9Z" />
  </svg>
);

const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M13.5 21v-7.5h2.52l.48-3h-3V8.6c0-.87.24-1.46 1.5-1.46H16.6V4.46c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05v2.11H7.8v3h2.5V21h3.2Z" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.77.07-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06-.06 1.25-.07 1.62-.07 4.77s.01 3.52.07 4.77c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.06-1.25.07-1.62.07-4.77s-.01-3.52-.07-4.77c-.05-1.08-.23-1.67-.38-2.06-.2-.52-.44-.89-.83-1.28a3.44 3.44 0 0 0-1.28-.83c-.39-.15-.98-.33-2.06-.38-1.25-.06-1.62-.07-4.77-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
  </svg>
);

const YelpIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.02 2.9c.4-.62 1.36-.5 1.6.2l2.03 6.02c.24.72-.44 1.4-1.16 1.16l-2.14-.72a.92.92 0 0 1-.6-1.03l.27-5.63Zm-6.4 2.83c-.16-.72.66-1.25 1.25-.8l4.53 3.42c.58.44.42 1.36-.27 1.57l-2.16.66a.92.92 0 0 1-1.1-.5L5.62 5.73Zm-1.5 7.32 5.6-1.24a.92.92 0 0 1 1.1.9v2.26c0 .62-.6 1.06-1.19.88l-5.42-1.67c-.71-.22-.75-1.2-.09-1.13Zm3.9 6.62 3.6-4.4c.47-.57 1.4-.3 1.48.44l.28 2.24a.92.92 0 0 1-.66 1l-4.14 1.63c-.7.27-1.28-.5-.56-.91Zm7.62.83-1.4-5.55a.92.92 0 0 1 1.15-1.1l2.17.7c.6.19.83.9.47 1.4l-3.2 4.5c-.44.6-1.4.14-1.19-.55Z" />
  </svg>
);

const platforms = [
  { key: "google", label: "Google Business Profile", Icon: GoogleIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "yelp", label: "Yelp", Icon: YelpIcon },
] as const;

export default function SocialLinks({
  className = "",
  variant = "dark",
}: {
  className?: string;
  /** "dark" = for use on dark backgrounds (footer); "light" = on light backgrounds. */
  variant?: "dark" | "light";
}) {
  const links = platforms.filter(({ key }) => business.social[key]);
  if (links.length === 0) return null;

  const style =
    variant === "dark"
      ? "border-white/20 text-white/80 hover:border-white/50 hover:text-white"
      : "border-black/15 text-brand-muted hover:border-brand-accent hover:text-brand-accent";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={business.social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${style}`}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
