import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 tw=" text-4xl font-sans font-black tracking-tight text-white md:text-6xl">
          albus
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
