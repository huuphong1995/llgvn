import { createSlug } from "@/lib/articles";
import type { ServiceImageDisplay } from "@/lib/service-image-display";

export type FeaturedServiceItem = {
  title: string;
  image: string;
  slug?: string;
  isoLabel?: string;
  imageDisplay?: ServiceImageDisplay;
};

export type FeaturedService = FeaturedServiceItem & {
  sectionHeading: string;
};

export function getServiceSlug(item: FeaturedServiceItem) {
  return item.slug ?? createSlug(item.title);
}

export function getAllFeaturedServices(
  sections: FeaturedServiceSection[] = featuredServiceSections,
): FeaturedService[] {
  return sections.flatMap((section) =>
    section.tiles.map((tile) => ({
      ...tile,
      sectionHeading: section.heading,
    })),
  );
}

export function getFeaturedServiceBySlug(
  slug: string,
  sections: FeaturedServiceSection[] = featuredServiceSections,
) {
  return getAllFeaturedServices(sections).find((item) => getServiceSlug(item) === slug) ?? null;
}

export type FeaturedServiceSection = {
  heading: string;
  slug?: string;
  tiles: FeaturedServiceItem[];
};

export function getSectionSlug(section: FeaturedServiceSection) {
  return section.slug ?? createSlug(section.heading);
}

export function getSectionBySlug(slug: string) {
  return featuredServiceSections.find((section) => getSectionSlug(section) === slug) ?? null;
}

export function getSectionForService(
  serviceSlug: string,
  sections: FeaturedServiceSection[] = featuredServiceSections,
) {
  const service = getFeaturedServiceBySlug(serviceSlug, sections);
  if (!service) return null;
  return sections.find((section) => section.heading === service.sectionHeading) ?? null;
}

export const featuredServiceSections: FeaturedServiceSection[] = [
  {
    heading: "Dịch vụ tư vấn thử nghiệm",
    slug: "dich-vu-tu-van-thu-nghiem",
    tiles: [
      {
        title: "Dịch vụ tư vấn thử nghiệm thực phẩm",
        slug: "dich-vu-tu-van-thu-nghiem-thuc-pham",
        image:
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Dịch vụ kiểm nghiệm thực phẩm chức năng",
        slug: "dich-vu-kiem-nghiem-thuc-pham-chuc-nang",
        image:
          "https://images.unsplash.com/photo-1576671414121-aa0c81c8697c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Dịch vụ tư vấn thử nghiệm bao bì thực phẩm",
        slug: "dich-vu-tu-van-thu-nghiem-bao-bi-thuc-pham",
        image:
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Dịch vụ tư vấn thử nghiệm trang thiết bị y tế",
        image:
          "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    heading: "Dịch vụ tư vấn công bố",
    slug: "dich-vu-tu-van-cong-bo",
    tiles: [
      {
        title: "Dịch vụ tư vấn công bố thực phẩm",
        slug: "dich-vu-tu-van-cong-bo-thuc-pham",
        image:
          "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Dịch vụ tư vấn công bố bao bì thực phẩm",
        image:
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Dịch vụ tư vấn công bố thiết bị y tế",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Dịch vụ tư vấn công bố hợp chuẩn hợp quy",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    heading: "Dịch vụ đào tạo tư vấn ISO",
    slug: "dich-vu-dao-tao-tu-van-iso",
    tiles: [
      {
        title: "Dịch vụ đào tạo tư vấn ISO",
        slug: "dich-vu-dao-tao-tu-van-iso",
        isoLabel: "",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];
