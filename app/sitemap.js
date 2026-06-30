import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { getAllServices } from "@/lib/services";

const SITE_LAST_MODIFIED = "2026-06-30";
const SERVICES_LAST_MODIFIED = "2026-06-30";

function latestDate(dates, fallback) {
  return (
    dates
      .filter(Boolean)
      .reduce((latest, date) => (date > latest ? date : latest), "") ||
    fallback
  );
}

export default function sitemap() {
  const posts = getAllPosts();
  const services = getAllServices();
  const blogLastModified = latestDate(
    posts.map((post) => post.updatedAt || post.publishedAt),
    SITE_LAST_MODIFIED,
  );

  const staticRoutes = [
    {
      url: absoluteUrl("/"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: blogLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt || post.publishedAt || blogLastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(post.image)],
  }));

  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(`/servicios/${service.id}`),
    lastModified: service.updatedAt || SERVICES_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.75,
    images: [absoluteUrl(service.image)],
  }));

  return [
    ...staticRoutes,
    {
      url: absoluteUrl("/servicios"),
      lastModified: SERVICES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceRoutes,
    ...blogRoutes,
  ];
}
