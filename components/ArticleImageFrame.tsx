"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getServiceImageDisplayStyle,
  normalizeServiceImageDisplay,
  type ServiceImageDisplay,
} from "@/lib/service-image-display";

type ArticleImageFrameProps = {
  src: string;
  alt: string;
  display?: Partial<ServiceImageDisplay>;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
};

export function ArticleImageFrame({
  src,
  alt,
  display,
  imageWidth,
  imageHeight,
  className = "",
}: ArticleImageFrameProps) {
  const settings = normalizeServiceImageDisplay(display);
  const initialAspect =
    imageWidth && imageHeight && imageHeight > 0 ? imageWidth / imageHeight : null;
  const [aspectRatio, setAspectRatio] = useState<number | null>(initialAspect);

  if (settings.fit === "contain") {
    const renderWidth = imageWidth ?? 1200;
    const renderHeight =
      imageHeight ?? (aspectRatio ? Math.round(renderWidth / aspectRatio) : 900);

    return (
      <div
        className={`relative mx-auto w-[94%] overflow-hidden bg-slate-100 ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={renderWidth}
          height={renderHeight}
          unoptimized
          className="block h-auto w-full"
          onLoadingComplete={(img) => {
            if (!initialAspect) {
              setAspectRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
      </div>
    );
  }

  const imageStyle = getServiceImageDisplayStyle(display);

  return (
    <div
      className={`relative mx-auto aspect-[4/3] w-[94%] overflow-hidden bg-slate-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="h-full w-full"
        style={imageStyle}
      />
    </div>
  );
}
