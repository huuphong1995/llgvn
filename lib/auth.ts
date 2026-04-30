import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "llg-vn-change-this-secret",
);

export async function createAdminToken(username: string) {
  return new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("12h")
    .setIssuedAt()
    .sign(SECRET);
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload.role === "admin";
}
