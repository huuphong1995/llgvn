"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logoImage from "@/LLGVN.jpg";
import { SITE_CONTAINER_CLASS } from "@/lib/constants";
import {
  featuredServiceSections,
  getServiceSlug,
} from "@/lib/featured-services";

type MegaKey = "services" | "knowledge" | "news";

type NavArticle = {
  _id: string;
  title: string;
  slug: string;
  category: "legal-updates" | "guidelines" | "case-studies";
  isFeatured: boolean;
  createdAt: string;
};

type MenuSection = {
  heading: string;
  items: { title: string; href: string }[];
};

const links: { href: string; label: string; mega?: MegaKey }[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/services", label: "Dịch vụ", mega: "services" },
  { href: "/knowledge", label: "Kiến thức", mega: "knowledge" },
  { href: "/news", label: "Tin tức", mega: "news" },
  { href: "/contact", label: "Liên hệ" },
];

const sectionAccents = [
  {
    heading: "text-emerald-700",
    line: "border-emerald-200",
    soft: "bg-emerald-50/50",
  },
  {
    heading: "text-sky-700",
    line: "border-sky-200",
    soft: "bg-sky-50/50",
  },
  {
    heading: "text-teal-700",
    line: "border-teal-200",
    soft: "bg-teal-50/50",
  },
] as const;

function ChevronIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function buildServiceSections(): MenuSection[] {
  return featuredServiceSections.map((section) => ({
    heading: section.heading,
    items: section.tiles.map((item) => ({
      title: item.title,
      href: `/services/${getServiceSlug(item)}`,
    })),
  }));
}

function buildKnowledgeSections(articles: NavArticle[]): MenuSection[] {
  const byCategory = (category: NavArticle["category"]) =>
    articles
      .filter((article) => article.category === category)
      .slice(0, 5)
      .map((article) => ({
        title: article.title,
        href: `/knowledge/${article.slug}`,
      }));

  return [
    {
      heading: "Hướng dẫn",
      items: byCategory("guidelines"),
    },
    {
      heading: "Nghiên cứu tình huống",
      items: byCategory("case-studies"),
    },
  ];
}

function buildNewsSections(articles: NavArticle[]): MenuSection[] {
  const news = articles.filter((article) => article.category === "legal-updates");
  const featured = news.filter((article) => article.isFeatured).slice(0, 5);
  const recent = news.slice(0, 5);

  return [
    {
      heading: "Tin nổi bật",
      items: (featured.length > 0 ? featured : recent).map((article) => ({
        title: article.title,
        href: `/knowledge/${article.slug}`,
      })),
    },
    {
      heading: "Tin mới cập nhật",
      items: recent.map((article) => ({
        title: article.title,
        href: `/knowledge/${article.slug}`,
      })),
    },
  ];
}

const megaMeta: Record<
  MegaKey,
  { title: string; subtitle: string; allHref: string; allLabel: string }
> = {
  services: {
    title: "Danh mục dịch vụ",
    subtitle: "Thử nghiệm · Công bố · Đào tạo ISO",
    allHref: "/services",
    allLabel: "Xem tất cả →",
  },
  knowledge: {
    title: "Kho kiến thức",
    subtitle: "Hướng dẫn · Nghiên cứu tình huống",
    allHref: "/knowledge",
    allLabel: "Xem tất cả →",
  },
  news: {
    title: "Tin tức",
    subtitle: "Cập nhật pháp lý · Thông tin mới nhất",
    allHref: "/news",
    allLabel: "Xem tất cả →",
  },
};

function MegaPanel({
  megaKey,
  sections,
  onClose,
}: {
  megaKey: MegaKey;
  sections: MenuSection[];
  onClose: () => void;
}) {
  const meta = megaMeta[megaKey];
  const columns = Math.min(Math.max(sections.length, 1), 3);

  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(920px,calc(100vw-3rem))] -translate-x-[42%] pt-3">
      <div className="mega-panel-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.4)]">
        <div className="mega-slide-in flex items-end justify-between gap-4 border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">
              {meta.title}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">{meta.subtitle}</p>
          </div>
          <Link
            href={meta.allHref}
            onClick={onClose}
            className="shrink-0 text-sm font-medium text-sky-700 transition hover:text-sky-900"
          >
            {meta.allLabel}
          </Link>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {sections.map((section, sectionIndex) => {
            const accent = sectionAccents[sectionIndex % sectionAccents.length];

            return (
              <div
                key={section.heading}
                className={`px-5 py-4 ${accent.soft} ${
                  sectionIndex < sections.length - 1 ? "border-r border-slate-100" : ""
                }`}
              >
                <p
                  className={`mega-slide-in mb-3 border-b pb-2 text-[12px] font-semibold tracking-wide ${accent.heading} ${accent.line}`}
                  style={{ animationDelay: `${80 + sectionIndex * 40}ms` }}
                >
                  {section.heading}
                </p>
                <ul className="space-y-0.5">
                  {section.items.length > 0 ? (
                    section.items.map((item, itemIndex) => (
                      <li
                        key={`${item.href}-${item.title}`}
                        className="mega-slide-in"
                        style={{
                          animationDelay: `${140 + sectionIndex * 50 + itemIndex * 55}ms`,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-[13px] leading-snug text-slate-600 transition hover:bg-white/80 hover:text-slate-900"
                        >
                          <span className="line-clamp-2 font-medium">{item.title}</span>
                          <span className="shrink-0 text-slate-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-sky-600">
                            <ChevronIcon />
                          </span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-2 py-2 text-[13px] text-slate-400">
                      Đang cập nhật nội dung
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="mega-slide-in flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-3"
          style={{ animationDelay: "360ms" }}
        >
          <p className="text-sm text-slate-500">
            Hotline tư vấn{" "}
            <a
              href="tel:0862564895"
              className="font-semibold text-slate-800 hover:text-emerald-700"
            >
              0862 564 895
            </a>
          </p>
          <Link
            href="/contact"
            onClick={onClose}
            className="rounded-md bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Nhận báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenuBlock({
  title,
  allHref,
  sections,
  onClose,
}: {
  title: string;
  allHref: string;
  sections: MenuSection[];
  onClose: () => void;
}) {
  return (
    <div className="mt-3 space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <Link href={allHref} onClick={onClose} className="text-xs font-medium text-sky-700">
          Xem tất cả →
        </Link>
      </div>
      {sections.map((section, sectionIndex) => {
        const accent = sectionAccents[sectionIndex % sectionAccents.length];
        return (
          <div key={section.heading}>
            <p
              className={`mb-1.5 border-b pb-1.5 text-xs font-semibold tracking-wide ${accent.heading} ${accent.line}`}
            >
              {section.heading}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={`${item.href}-${item.title}`}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-md px-1.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [articles, setArticles] = useState<NavArticle[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/articles")
      .then((response) => response.json())
      .then((data: unknown) => {
        if (cancelled || !Array.isArray(data)) return;
        setArticles(data as NavArticle[]);
      })
      .catch(() => {
        if (!cancelled) setArticles([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const serviceSections = buildServiceSections();
  const knowledgeSections = buildKnowledgeSections(articles);
  const newsSections = buildNewsSections(articles);

  const megaSections: Record<MegaKey, MenuSection[]> = {
    services: serviceSections,
    knowledge: knowledgeSections,
    news: newsSections,
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="border-b bg-slate-900 text-xs text-white">
        <div
          className={`${SITE_CONTAINER_CLASS} flex flex-col items-start justify-between gap-1 py-2 sm:flex-row sm:items-center`}
        >
          <p>Hotline: 0862 564 895</p>
          <p>Email: info@llgbiotech.vn</p>
        </div>
      </div>
      <nav className={`${SITE_CONTAINER_CLASS} flex items-center justify-between py-4`}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoImage}
            alt="Logo LLG VN"
            width={58}
            height={58}
            className="h-12 w-12 rounded-full object-cover"
            priority
          />
          <span className="text-2xl font-black text-sky-900">LLG VN</span>
        </Link>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? "Đóng" : "Menu"}
        </button>
        <div className="hidden items-center gap-1 text-[15px] font-semibold lg:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            if (link.mega) {
              const isOpen = openMega === link.mega;
              return (
                <div
                  key={link.href}
                  onMouseEnter={() => setOpenMega(link.mega!)}
                  onMouseLeave={() => setOpenMega(null)}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`rounded px-4 py-2 transition ${
                      active || isOpen
                        ? "bg-sky-700 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isOpen ? (
                    <MegaPanel
                      megaKey={link.mega}
                      sections={megaSections[link.mega]}
                      onClose={() => setOpenMega(null)}
                    />
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-4 py-2 transition ${
                  active
                    ? "bg-sky-700 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
      {mobileOpen ? (
        <div
          className={`${SITE_CONTAINER_CLASS} border-t border-slate-200 bg-white py-3 lg:hidden`}
        >
          <div className="space-y-1">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded px-3 py-2 text-sm font-semibold ${
                    active
                      ? "bg-sky-700 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <MobileMenuBlock
            title="Danh mục dịch vụ"
            allHref="/services"
            sections={serviceSections}
            onClose={() => setMobileOpen(false)}
          />
          <MobileMenuBlock
            title="Kho kiến thức"
            allHref="/knowledge"
            sections={knowledgeSections}
            onClose={() => setMobileOpen(false)}
          />
          <MobileMenuBlock
            title="Tin tức"
            allHref="/news"
            sections={newsSections}
            onClose={() => setMobileOpen(false)}
          />
        </div>
      ) : null}
    </header>
  );
}
