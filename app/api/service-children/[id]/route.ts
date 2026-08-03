import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/auth";
import {
  deleteServiceChild,
  getServiceChildById,
  updateServiceChild,
} from "@/lib/service-children-store";

const updateSchema = z.object({
  parentSlug: z.string().min(1).optional(),
  title: z.string().min(5).optional(),
  summary: z.string().min(10).optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  isoLabel: z.string().optional(),
  slug: z.string().optional(),
});

function revalidateServicePages(parentSlug: string) {
  revalidatePath(`/services/${parentSlug}`);
  revalidatePath(`/services/${parentSlug}/[articleSlug]`, "page");
  revalidatePath("/services");
  revalidatePath("/");
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
  const existing = await getServiceChildById(id);

  try {
    const child = await updateServiceChild(id, parsed.data);
    if (!child) {
      return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
    }

    if (existing) revalidateServicePages(existing.parentSlug);
    revalidateServicePages(child.parentSlug);
    return NextResponse.json(child);
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
  const existing = await getServiceChildById(id);
  const deleted = await deleteServiceChild(id);

  if (!deleted || !existing) {
    return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  }

  revalidateServicePages(existing.parentSlug);
  return NextResponse.json({ success: true });
}
