import Link from "next/link";
import { IsoLabelVisual } from "@/components/IsoLabelVisual";
import { ServiceImageFrame } from "@/components/ServiceImageFrame";
import type { ServiceImageDisplay } from "@/lib/service-image-display";
import { isUploadedServiceImage } from "@/lib/service-image-storage";

interface ServiceTileCardProps {
  title: string;
  image: string;
  href: string;
  isoLabel?: string;
  imageDisplay?: Partial<ServiceImageDisplay>;
}

export function ServiceTileCard({
  title,
  image,
  href,
  isoLabel,
  imageDisplay,
}: ServiceTileCardProps) {
  const showIsoLabel = isoLabel !== undefined && !isUploadedServiceImage(image);

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {showIsoLabel ? (
        <IsoLabelVisual label={isoLabel} className="aspect-[270.5/180.48] w-full" />
      ) : (
        <ServiceImageFrame src={image} alt={title} display={imageDisplay} hoverZoom />
      )}
      <div className="flex flex-col p-4 sm:p-5">
        <h3 className="flex-1 font-semibold leading-snug text-slate-900">{title}</h3>
        <Link
          href={href}
          className="mt-4 inline-block text-sm font-medium text-sky-700 hover:text-sky-800"
        >
          Xem thêm &gt;
        </Link>
      </div>
    </article>
  );
}
