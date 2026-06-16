import { ImageResponse } from "next/og";

export const alt = "Xbox Cemetery — studios laid to rest by the green machine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic social-share card: the CrossOrb on the memorial's dark-green field.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#040704",
          backgroundImage:
            "radial-gradient(140% 90% at 50% 118%, #1a3a10 0%, #0a160a 38%, #040704 78%)",
          color: "#eaffc0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 200,
            height: 200,
            borderRadius: 200,
            backgroundImage:
              "radial-gradient(circle at 36% 30%, #e6ffb0 0%, #8fd13a 38%, #1c4f0c 100%)",
            marginBottom: 52,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 90,
              top: 42,
              width: 20,
              height: 116,
              background: "#f2ffd0",
              borderRadius: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 60,
              top: 78,
              width: 80,
              height: 20,
              background: "#f2ffd0",
              borderRadius: 10,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: 6,
          }}
        >
          XBOX CEMETERY
        </div>
      </div>
    ),
    { ...size },
  );
}
