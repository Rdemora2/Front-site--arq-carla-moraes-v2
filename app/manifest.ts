import type { MetadataRoute } from "next";
import { business } from "@/lib/data/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: "Carla Moraes",
    description: business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#29392D",
    lang: "pt-BR",
    categories: ["business", "lifestyle", "design"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
