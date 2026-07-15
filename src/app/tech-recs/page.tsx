import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { MotionArticleCard } from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Tech Recs — Computed",
  description:
    "Honest opinions on stuff you might actually buy. Deep dives into tech, developer workflows, and tools worth looking into.",
};

export const dynamic = 'force-dynamic';

export default async function TechRecs() {
  const posts = await prisma.post.findMany({
    where: { category: "Tech Recs" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-terracotta">
        Tech Recs
      </h1>
      <p className="text-xl text-zinc-800 font-serif leading-relaxed mb-12 max-w-xl">
        Honest opinions on stuff you might actually buy, deep dives into tech, developer workflows, and tools worth looking into
      </p>

      <div className="space-y-12">
        {posts.length === 0 ? (
          <div className="border-dashed border-2 border-sage-dark/40 bg-sage/10 rounded-xl p-12 text-center text-ink-light font-serif">
            No tech recommendations yet.
          </div>
        ) : (
          posts.map(post => (
            <MotionArticleCard key={post.id} className="border border-sage-dark/30 rounded-xl p-8 bg-white">
              <header className="mb-4">
                <h2 className="text-2xl font-semibold mb-1">
                  <Link href={`/post/${post.slug}`} className="hover:text-olive transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <time className="text-sm text-ink-light font-sans">{post.createdAt.toLocaleDateString()}</time>
              </header>
              
              <div className="prose-custom text-ink-light leading-relaxed space-y-4 mb-6 line-clamp-4">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-sage-dark/30">
                <Link href={`/post/${post.slug}`} className="font-sans font-bold text-sm uppercase tracking-wide text-terracotta hover:text-terracotta-dark transition-colors">
                  Read Full Review &rarr;
                </Link>
              </div>
            </MotionArticleCard>
          ))
        )}
      </div>
    </div>
  );
}
