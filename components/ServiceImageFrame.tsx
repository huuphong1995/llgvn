import Image from "next/image";
import {
  getServiceImageDisplayStyle,
  type ServiceImageDisplay,
} from "@/lib/service-image-display";

type ServiceImageFrameProps = {
  src: string;
  alt: string;
  display?: Partial<ServiceImageDisplay>;
  className?: string;
  imageClassName?: string;
  hoverZoom?: boolean;
};

export function ServiceImageFrame({
  src,
  alt,
  display,
  className = "",
  imageClassName = "",
  hoverZoom = false,
}: ServiceImageFrameProps) {
  const imageStyle = getServiceImageDisplayStyle(display);

  return (
    <div className={`relative aspect-[270.5/180.48] w-full overflow-hidden bg-slate-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={270.5}
        height={180.48}
        unoptimized
        className={`h-full w-full ${hoverZoom ? "transition duration-300 group-hover:scale-105" : ""} ${imageClassName}`}
        style={imageStyle}
      />
    </div>
  );
}
