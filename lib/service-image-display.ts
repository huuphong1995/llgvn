export type ServiceImageFit = "cover" | "contain";

export type ServiceImageDisplay = {
  fit: ServiceImageFit;
  scale: number;
  positionX: number;
  positionY: number;
};

export const DEFAULT_SERVICE_IMAGE_DISPLAY: ServiceImageDisplay = {
  fit: "cover",
  scale: 100,
  positionX: 50,
  positionY: 50,
};

export function normalizeServiceImageDisplay(
  partial?: Partial<ServiceImageDisplay>,
): ServiceImageDisplay {
  const fit = partial?.fit === "contain" ? "contain" : "cover";
  const scale = clampNumber(partial?.scale ?? 100, 50, 150);
  const positionX = clampNumber(partial?.positionX ?? 50, 0, 100);
  const positionY = clampNumber(partial?.positionY ?? 50, 0, 100);

  return { fit, scale, positionX, positionY };
}

export function getServiceImageDisplayStyle(display?: Partial<ServiceImageDisplay>) {
  const settings = normalizeServiceImageDisplay(display);

  return {
    objectFit: settings.fit,
    objectPosition: `${settings.positionX}% ${settings.positionY}%`,
    transform: settings.scale !== 100 ? `scale(${settings.scale / 100})` : undefined,
    transformOrigin: `${settings.positionX}% ${settings.positionY}%`,
  } as const;
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
