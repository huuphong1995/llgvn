import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import Article from "@/models/Article";
import User from "@/models/User";
import { sampleArticles } from "@/lib/sample-data";

export async function POST() {
  await connectDb();
  await Article.deleteMany({});
  await Article.insertMany(sampleArticles);
  const existing = await User.findOne({ username: "admin" });
  if (existing) {
    existing.password = "admin123456";
    await existing.save();
  } else {
    await User.create({ username: "admin", password: "admin123456" });
  }

  return NextResponse.json({ success: true, message: "Seed completed." });
}
