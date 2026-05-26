"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllPosts } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  // Get posts from the re-structured library
  const posts = useMemo(() => getAllPosts(), []);
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const title = hero.querySelector(".future-title");
      const sub = hero.querySelector(".future-subtitle");
      const badge = hero.querySelector(".future-eyebrow");

      gsap.from([badge, title, sub], {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="blog-future-page">
      <div className="future-grid-bg" />
      <div className="future-orb one" />
      <div className="future-orb two" />
      <div className="future-orb three" />

      <section ref={heroRef} className="future-hero">
        <div className="container future-hero-shell">
          <p className="future-eyebrow">Knowledge archive</p>
          <h1 className="future-title">
            Medicina que <span>se entiende</span>
          </h1>
          <p className="future-subtitle">
            Un blog diseñado como una experiencia editorial inmersiva:
            información clara sobre patologías, procedimientos y recuperación de
            pie y tobillo, con una estética moderna y futurista.
          </p>
        </div>
      </section>

      <section style={{ padding: "0px 0 100px" }}>
        <div className="container">
          <div
            className="future-card-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px",
            }}
          >
            {posts.map((post, index) => (
              <article
                key={`${post.slug}-${index}`}
                className="future-hover-card"
              >
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "18px",
                    marginBottom: "20px",
                    aspectRatio: "16/9",
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: "rgba(7, 18, 33, 0.8)",
                      backdropFilter: "blur(5px)",
                      padding: "4px 12px",
                      borderRadius: "99px",
                      fontSize: "0.7rem",
                      color: "var(--cyan)",
                      border: "1px solid rgba(124, 234, 255, 0.2)",
                    }}
                  >
                    {post.type}
                  </div>
                </div>

                <small
                  style={{ color: "var(--muted)", letterSpacing: "0.1em" }}
                >
                  {post.date}
                </small>
                <h3
                  style={{
                    marginTop: "12px",
                    color: "#fff",
                    fontSize: "1.4rem",
                    lineHeight: "1.3",
                  }}
                >
                  {post.title}
                </h3>
                {/* Use paragraph1 as a snippet */}
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.95rem",
                    margin: "15px 0",
                  }}
                >
                  {post.paragraph1.substring(0, 120)}...
                </p>

                <div style={{ marginTop: "auto" }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="future-link"
                    style={{ width: "100%" }}
                  >
                    Leer Artículo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
