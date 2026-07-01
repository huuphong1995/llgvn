import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { saveUploadedArticleImage } from "@/lib/article-image-storage";

async function requireAdmin() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const articleId = String(formData.get("articleId") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Vui lòng chọn file ảnh." }, { status: 400 });
  }

  try {
    const result = await saveUploadedArticleImage(file, articleId || undefined);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload ảnh thất bại.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
