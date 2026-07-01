import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { deleteArticle, updateArticle } from "@/lib/articles";
import { optionalArticleImageSchema } from "@/lib/article-image-validation";
import { imageDisplaySchema } from "@/lib/image-display-validation";
import { verifyAdminToken } from "@/lib/auth";

const updateSchema = z.object({
  title: z.string().min(10).optional(),
  summary: z.string().min(10).optional(),
  content: z.string().min(20).optional(),
  image: optionalArticleImageSchema,
  imageDisplay: imageDisplaySchema,
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  category: z.enum(["legal-updates", "guidelines", "case-studies"]).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

function revalidateArticlePages() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/knowledge");
  revalidatePath("/knowledge/[slug]", "page");
}

async function checkAuth() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  return token ? verifyAdminToken(token) : false;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await params;

  try {
    const article = await updateArticle(id, parsed.data);
    if (!article) {
      return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
    }

    revalidateArticlePages();
    return NextResponse.json(article);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cập nhật bài viết thất bại.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteArticle(id);

  if (!deleted) {
    return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  }

  revalidateArticlePages();
  return NextResponse.json({ success: true });
}
