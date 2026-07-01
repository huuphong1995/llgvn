import Image from "next/image";
import Link from "next/link";
import { IsoLabelVisual } from "@/components/IsoLabelVisual";

interface ServiceSubArticleCardProps {
  title: string;
  summary: string;
  image: string;
  href: string;
  isoLabel?: string;
}

export function ServiceSubArticleCard({
  title,
  summary,
  image,
  href,
  isoLabel,
}: ServiceSubArticleCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded border border-slate-200 bg-white transition hover:border-sky-200 hover:shadow-sm sm:flex-row"
    >
      <div className="relative h-[180.48px] w-full shrink-0 overflow-hidden bg-slate-100 sm:w-[270.5px]">
        {isoLabel !== undefined ? (
          <IsoLabelVisual label={isoLabel} />
        ) : (
          <Image
            src={image}
            alt={title}
            width={270.5}
            height={180.48}
            unoptimized
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-4">
        <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-sky-800">
          {title}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">{summary}</p>
      </div>
    </Link>
  );
}
