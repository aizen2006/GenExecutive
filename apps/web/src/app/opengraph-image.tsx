import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GenExecutive — Executive Intelligence & AI Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          // Satori has no blur filter, so the glow is baked into the gradients.
          backgroundColor: "#3730a3",
          backgroundImage: [
            "radial-gradient(circle at 12% 8%, rgba(167,139,250,0.45) 0%, rgba(167,139,250,0) 55%)",
            "radial-gradient(circle at 92% 95%, rgba(129,140,248,0.35) 0%, rgba(129,140,248,0) 50%)",
            "linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)",
          ].join(","),
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 16,
              color: "rgba(221,214,254,0.9)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Executive Intelligence & AI Automation
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            GenExecutive
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: "rgba(221,214,254,0.85)",
              fontWeight: 400,
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Executive support, AI automation, and custom agents working together to elevate your business.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
