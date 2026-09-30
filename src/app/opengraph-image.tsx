import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = "Orji Michael — Full-Stack Developer & Digital Professional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#e8eaee",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#101114",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: "0.06em", color: "#101114" }}>
            {profile.wordmark}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#101114",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 36, color: "#55585f" }}>{profile.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#9a9da4",
            fontSize: 22,
          }}
        >
          <div>{profile.location}</div>
          <div>{new URL(profile.siteUrl).host}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
