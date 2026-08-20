import type { Metadata } from "next";
import { SITE_CONTACT } from "@/lib/constants";

export const SITE_NAME = "LLG VN";
export const SITE_TAGLINE =
  "Tư vấn công bố sản phẩm, thử nghiệm thực phẩm – thiết bị y tế và đào tạo ISO";

export const DEFAULT_DESCRIPTION =
  "LLG VN hỗ trợ doanh nghiệp tư vấn thử nghiệm, công bố thực phẩm – thiết bị y tế, hợp chuẩn hợp quy và đào tạo tư vấn ISO. Đồng hành pháp lý, tận tâm, hiệu quả.";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return `https://${vercelProd.replace(/^https?:\/\//, "")}`;

  return "https://llg-vn.vercel.app";
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImages = image
    ? [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: getSiteUrl(),
    telephone: SITE_CONTACT.phoneDisplay,
    email: SITE_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONTACT.address,
      addressLocality: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    sameAs: [SITE_CONTACT.zaloUrl, SITE_CONTACT.facebookUrl],
    areaServed: "VN",
  };
}
