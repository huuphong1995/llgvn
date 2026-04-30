import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  const body = await request.json();
  await connectDb();

  let user = await User.findOne({ username: body.username });
  if (!user && body.username === "admin") {
    user = await User.create({ username: "admin", password: "admin123456" });
  }

  if (!user || !(await user.comparePassword(body.password))) {
    return NextResponse.json(
      { error: "Thông tin đăng nhập không hợp lệ" },
      { status: 401 },
    );
  }

  const token = await createAdminToken(user.username);
  const response = NextResponse.json({ success: true });
  response.cookies.set("llg_admin_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
