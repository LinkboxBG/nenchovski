import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Хамали Ненчовски",
    short_name: "Ненчовски",
    description:
      "Хамалски и транспортни услуги в София и цялата страна от 2008 г.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#e42222",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
