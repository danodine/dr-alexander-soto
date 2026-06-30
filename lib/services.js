import fs from "node:fs";
import path from "node:path";

const servicesPath = path.join(
  process.cwd(),
  "public",
  "assets",
  "data",
  "services.json",
);

let servicesCache;

function fixAssetPath(assetPath = "") {
  return assetPath.replace(/^\.\.\//, "/");
}

function normalizeService(service) {
  const images = Array.isArray(service.imagesCarucel)
    ? service.imagesCarucel
    : [];
  const symptoms = Array.isArray(service.symptoms) ? service.symptoms : [];

  return {
    ...service,
    image: fixAssetPath(service.image),
    imagesCarucel: images.map((item) => ({
      ...item,
      image: fixAssetPath(item.image),
    })),
    symptoms,
  };
}

export function getAllServices() {
  if (!servicesCache) {
    const raw = fs.readFileSync(servicesPath, "utf8");
    servicesCache = JSON.parse(raw).map(normalizeService);
  }

  return servicesCache;
}

export function getServiceById(id) {
  return getAllServices().find((service) => service.id === id);
}

export function getServicesByCategory(category) {
  return getAllServices().filter((service) => service.categoria === category);
}
