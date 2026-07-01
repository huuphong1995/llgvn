import type { ReactNode } from "react";
import { SITE_CONTAINER_CLASS } from "@/lib/constants";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return <div className={`${SITE_CONTAINER_CLASS} ${className}`}>{children}</div>;
}
