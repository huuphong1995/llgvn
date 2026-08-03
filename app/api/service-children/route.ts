import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/auth";
import {
  createServiceChild,
  listServiceChildren,
} from "@/lib/service-children-store";

const createSchema = z.object({
  parentSlug: z.string().min(1),
  title: z.string().min(5),
  summary: z.string().min(10),
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

export async function GET(request: NextRequest) {
  const parentSlug = request.nextUrl.searchParams.get("parentSlug") ?? undefined;
  const items = await listServiceChildren(parentSlug);
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const child = await createServiceChild(parsed.data);
    revalidateServicePages(child.parentSlug);
    return NextResponse.json(child, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Tạo bài viết thất bại.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
