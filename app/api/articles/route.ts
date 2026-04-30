import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import Article from "@/models/Article";
import { connectDb } from "@/lib/db";
import { createSlug } from "@/lib/articles";
import { verifyAdminToken } from "@/lib/auth";

const articleSchema = z.object({
  title: z.string().min(10),
  summary: z.string().min(10),
  content: z.string().min(20),
  category: z.enum(["legal-updates", "guidelines", "case-studies"]),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const category = request.nextUrl.searchParams.get("category");
  await connectDb();

  const filter: Record<string, unknown> = {};
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { summary: { $regex: query, $options: "i" } },
    ];
  }
  if (category) filter.category = category;

  const articles = await Article.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDb();
  const article = await Article.create({
    ...parsed.data,
    slug: createSlug(parsed.data.title),
  });
  return NextResponse.json(article, { status: 201 });
}
