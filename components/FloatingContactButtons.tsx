import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_CONTACT } from "@/lib/constants";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.37 2.3.57 3.5.57a1 1 0 011 1V20a1 1 0 01-1 1C11.4 21 3 12.6 3 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.2 2.4.57 3.5a1 1 0 01-.25 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <Image
      src="/zalo-icon.png"
      alt=""
      width={28}
      height={28}
      className="h-7 w-7 object-contain"
      unoptimized
    />
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}

type ActionItem = {
  key: string;
  label: string;
  href: string;
  external?: boolean;
  className: string;
  icon: ReactNode;
  delay: string;
  motion: "bounce" | "ring";
};

const actions: ActionItem[] = [
  {
    key: "call",
    label: "Gọi tư vấn",
    href: `tel:${SITE_CONTACT.phoneTel}`,
    className: "bg-emerald-600 hover:bg-emerald-700",
    icon: <PhoneIcon />,
    delay: "0s",
    motion: "ring",
  },
  {
    key: "contact",
    label: "Gửi yêu cầu",
    href: "/contact",
    className: "bg-sky-700 hover:bg-sky-800",
    icon: <MailIcon />,
    delay: "0.35s",
    motion: "bounce",
  },
  {
    key: "zalo",
    label: "Zalo",
    href: SITE_CONTACT.zaloUrl,
    external: true,
    className: "bg-white hover:bg-slate-50 ring-1 ring-[#0068FF]/30",
    icon: <ZaloIcon />,
    delay: "0.7s",
    motion: "bounce",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: SITE_CONTACT.facebookUrl,
    external: true,
    className: "bg-[#1877F2] hover:bg-[#0f65d8]",
    icon: <FacebookIcon />,
    delay: "1.05s",
    motion: "bounce",
  },
];

function ActionButton({ item }: { item: ActionItem }) {
  const motionClass = item.motion === "ring" ? "fab-ring" : "fab-bounce";
  const labelClass =
    item.key === "zalo"
      ? "text-[#0068FF]"
      : "text-white";
  const className = `${motionClass} group relative flex h-12 items-center overflow-hidden rounded-full shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${item.className} w-12 hover:w-auto hover:pr-4 focus-within:w-auto focus-within:pr-4 ${item.key === "zalo" ? "" : "text-white"}`;

  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center">{item.icon}</span>
      <span
        className={`max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-within:max-w-[9rem] group-focus-within:opacity-100 ${labelClass}`}
      >
        {item.label}
      </span>
    </>
  );

  const style = {
    animationDelay: item.delay,
  } as const;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        title={item.label}
        className={className}
        style={style}
      >
        {content}
      </a>
    );
  }

  if (item.href.startsWith("tel:")) {
    return (
      <a
        href={item.href}
        aria-label={item.label}
        title={item.label}
        className={className}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      title={item.label}
      className={className}
      style={style}
    >
      {content}
    </Link>
  );
}

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2.5 md:bottom-5 md:right-5">
      {actions.map((item) => (
        <ActionButton key={item.key} item={item} />
      ))}
    </div>
  );
}
