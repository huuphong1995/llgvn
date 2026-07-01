import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface ServiceBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function ServiceBreadcrumbs({ items }: ServiceBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 ? <span className="mx-1">&gt;</span> : null}
            {item.href && !isLast ? (
              <Link href={item.href} className="text-sky-700 hover:text-sky-900">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-slate-700" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
