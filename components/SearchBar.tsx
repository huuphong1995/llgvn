"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    router.push(`/knowledge?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm kiếm bài viết kiến thức..."
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-700 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white"
      >
        Tìm kiếm
      </button>
    </form>
  );
}
