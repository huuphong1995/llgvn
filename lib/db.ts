import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/llg_vn_consulting";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment.");
}

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "llg_vn",
      serverSelectionTimeoutMS: 3000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
