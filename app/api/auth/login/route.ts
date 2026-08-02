import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import User from "@/models/User";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "NgayMoiVuiVe@123";

function matchesFallbackAdmin(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

async function matchesMongoAdmin(username: string, password: string) {
  try {
    await connectDb();

    let user = await User.findOne({ username });
    if (!user && username === ADMIN_USERNAME) {
      user = await User.create({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      });
    }

    if (!user) return false;
    return user.comparePassword(password);
  } catch {
    // Không có MongoDB (thường gặp trên Vercel) → bỏ qua.
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu." },
        { status: 400 },
      );
    }

    const ok =
      matchesFallbackAdmin(username, password) ||
      (await matchesMongoAdmin(username, password));

    if (!ok) {
      return NextResponse.json(
        { error: "Thông tin đăng nhập không hợp lệ" },
        { status: 401 },
      );
    }

    const token = await createAdminToken(username);
    const response = NextResponse.json({ success: true });
    response.cookies.set("llg_admin_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 12,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Không thể đăng nhập. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
