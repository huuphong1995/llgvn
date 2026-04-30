import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import Article from "@/models/Article";
import { connectDb } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

const updateSchema = z.object({
  title: z.string().min(10).optional(),
  summary: z.string().min(10).optional(),
  content: z.string().min(20).optional(),
  category: z.enum(["legal-updates", "guidelines", "case-studies"]).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

async function checkAuth() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  return token ? verifyAdminToken(token) : false;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDb();
  const { id } = await params;
  const article = await Article.findByIdAndUpdate(id, parsed.data, { new: true });
  return NextResponse.json(article);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDb();
  const { id } = await params;
  await Article.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
