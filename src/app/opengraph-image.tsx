import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nodo — Transformamos ideas en software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Mesh gradient orbs — sutiles */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,47,239,0.22), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -200,
            width: 680,
            height: 680,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,193,244,0.18), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 180,
            right: 180,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(39,133,254,0.12), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Header — Logo + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background:
                "linear-gradient(135deg, #8b2fef 0%, #5863f2 35%, #2785fe 65%, #00c1f4 100%)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
              color: "#0a0a0a",
              letterSpacing: "-0.04em",
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.26em",
            }}
          >
            NODO
          </span>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            marginTop: 12,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              marginBottom: 32,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginRight: 24 }}>Transformamos</span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
                marginRight: 24,
              }}
            >
              ideas
            </span>
            <span>en software.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#b0b0cc",
              fontWeight: 400,
              letterSpacing: "-0.005em",
            }}
          >
            Software house boutique · Desarrollo · WordPress · IA
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#8888aa",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
          }}
        >
          <span>El punto donde tu idea se conecta con el mundo.</span>
          <span style={{ color: "#00c1f4", fontWeight: 500 }}>
            nodotech.dev
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
