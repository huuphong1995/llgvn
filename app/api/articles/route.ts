import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createArticle, getArticles } from "@/lib/articles";
import { optionalArticleImageSchema } from "@/lib/article-image-validation";
import { imageDisplaySchema } from "@/lib/image-display-validation";
import { verifyAdminToken } from "@/lib/auth";

const articleSchema = z.object({
  title: z.string().min(10),
  summary: z.string().min(10),
  content: z.string().min(20),
  image: optionalArticleImageSchema,
  imageDisplay: imageDisplaySchema,
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  category: z.enum(["legal-updates", "guidelines", "case-studies"]),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
});

function revalidateArticlePages() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/knowledge");
  revalidatePath("/knowledge/[slug]", "page");
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? undefined;
  const category = request.nextUrl.searchParams.get("category") ?? undefined;

  const articles = await getArticles({
    q: query,
    category,
    limit: 200,
  });

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

  try {
    const article = await createArticle(parsed.data);
    revalidateArticlePages();
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Tạo bài viết thất bại.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
