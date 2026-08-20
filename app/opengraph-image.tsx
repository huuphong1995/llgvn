import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0f172a 0%, #0f766e 55%, #0369a1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            LLG VN
          </div>
          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15, maxWidth: 900 }}>
            Tư vấn công bố, thử nghiệm & ISO
          </div>
          <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 820, lineHeight: 1.4 }}>
            Chuyên nghiệp · Tận tâm · Hiệu quả cho doanh nghiệp Việt Nam
          </div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.85 }}>llg-vn.vercel.app</div>
      </div>
    ),
    size,
  );
}
