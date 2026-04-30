import Link from "next/link";
import { ARTICLE_CATEGORIES } from "@/lib/constants";

interface CategoryListProps {
  selected?: string;
}

export function CategoryList({ selected }: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/knowledge"
        className={`rounded-full px-3 py-1 text-sm ${
          !selected ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        Tất cả
      </Link>
      {ARTICLE_CATEGORIES.map((category) => (
        <Link
          key={category.value}
          href={`/knowledge?category=${category.value}`}
          className={`rounded-full px-3 py-1 text-sm ${
            selected === category.value
              ? "bg-sky-700 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
