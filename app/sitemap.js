import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const staticRoutes = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(post.image)],
  }));

  return [...staticRoutes, ...blogRoutes];
}

