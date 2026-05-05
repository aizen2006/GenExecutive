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
          background: "linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(167,139,250,0.22)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(129,140,248,0.18)",
            filter: "blur(60px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 1,
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
