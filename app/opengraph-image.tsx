import { ImageResponse } from "next/og";

export const alt = "Kevin Zheng — Mechatronics student and developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f5f4ef",
          color: "#17191f",
          border: "16px solid #17191f",
          padding: "52px 60px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>Kevin Zheng</span>
          <span>Portfolio / 2026</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              width: 96,
              height: 8,
              background: "#0c7a5b",
              marginBottom: 28,
            }}
          />
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            Mechatronics student &amp; developer.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#4a4f58",
              maxWidth: 820,
            }}
          >
            I build web tools and enjoy the overlap between mechanical
            engineering and software.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 16,
            letterSpacing: 2,
            color: "#4a4f58",
          }}
        >
          <span>Brooklyn, New York</span>
          <span>kevinzheng.fyi</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
