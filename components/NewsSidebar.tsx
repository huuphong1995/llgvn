import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface NewsSidebarProps {
  recentPosts: Article[];
  searchPath?: string;
}

export function NewsSidebar({ recentPosts, searchPath = "/knowledge" }: NewsSidebarProps) {
  return (
    <aside className="space-y-6">
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Tìm kiếm</h3>
        <form action={searchPath} className="mt-3 flex">
          <input
            name="q"
            placeholder="Tìm bài viết..."
            className="w-full border border-slate-300 px-3 py-2 text-sm focus:border-sky-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Tìm
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          Bài viết mới
        </h3>
        <div className="mt-3 space-y-3">
          {recentPosts.map((post) => (
            <Link
              key={post._id}
              href={`/knowledge/${post.slug}`}
              className="flex items-start gap-3 border-b border-slate-100 pb-3 text-sm font-medium text-slate-700 hover:text-sky-700 last:border-0 last:pb-0"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={
                    post.image ||
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80"
                  }
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span>{post.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Danh mục</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Cập nhật pháp lý</li>
          <li>Hướng dẫn</li>
          <li>Nghiên cứu tình huống</li>
        </ul>
      </section>
    </aside>
  );
}
