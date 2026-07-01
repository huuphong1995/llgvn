"use client";

import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ServiceBreadcrumbs } from "@/components/ServiceBreadcrumbs";
import { ServiceSubArticleCard } from "@/components/ServiceSubArticleCard";

type ServiceSectionArticle = {
  title: string;
  summary: string;
  image: string;
  href: string;
  isoLabel?: string;
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface ServiceSectionViewProps {
  breadcrumbs: BreadcrumbItem[];
  topicTitle: string;
  articles: ServiceSectionArticle[];
}

export function ServiceSectionView({
  breadcrumbs,
  topicTitle,
  articles,
}: ServiceSectionViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "comments">("overview");
  const [commentsOpen, setCommentsOpen] = useState(true);

  return (
    <div className="space-y-6">
      <ServiceBreadcrumbs items={breadcrumbs} />

      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`relative pb-3 text-sm font-bold tracking-wide transition ${
              activeTab === "overview" ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            TỔNG QUAN
            {activeTab === "overview" ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-teal-600" />
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("comments")}
            className={`relative pb-3 text-sm font-bold tracking-wide transition ${
              activeTab === "comments" ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            BÌNH LUẬN
            {activeTab === "comments" ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-teal-600" />
            ) : null}
          </button>
        </div>
      </div>

      {activeTab === "overview" ? (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {articles.map((article) => (
              <ServiceSubArticleCard
                key={article.href}
                title={article.title}
                summary={article.summary}
                image={article.image}
                href={article.href}
                isoLabel={article.isoLabel}
              />
            ))}
          </div>

          <div className="overflow-hidden rounded border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setCommentsOpen((open) => !open)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-semibold text-slate-900">Bình luận</span>
              <span className="text-xl leading-none text-slate-500">{commentsOpen ? "−" : "+"}</span>
            </button>
            {commentsOpen ? (
              <div className="border-t border-slate-200 px-4 py-5">
                <p className="mb-4 text-sm text-slate-600">
                  Gửi câu hỏi hoặc yêu cầu tư vấn về {topicTitle.toLowerCase()}.
                </p>
                <ContactForm initialService={topicTitle} />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="rounded border border-slate-200 bg-white px-4 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Bình luận &amp; tư vấn</h2>
          <p className="mt-2 text-sm text-slate-600">
            Để lại thông tin để đội ngũ LLG VN hỗ trợ bạn về {topicTitle.toLowerCase()}.
          </p>
          <div className="mt-4">
            <ContactForm initialService={topicTitle} />
          </div>
        </div>
      )}
    </div>
  );
}
