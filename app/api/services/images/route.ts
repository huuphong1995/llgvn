import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { getAdminServiceImageItemsResolved } from "@/lib/service-images";
export async function GET() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const services = await getAdminServiceImageItemsResolved();
  return NextResponse.json(services);
}