import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { MotionArticleCard } from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Physics — Computed",
  description:
    "Physics, then more physics, then engineering, then aerodynamics. Written the way I'd explain it to a friend who's never taken a physics class and doesn't plan to.",
};

export const dynamic = 'force-dynamic';

export default async function Physics() {
  const posts = await prisma.post.findMany({
    where: { category: "Physics" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-olive">
        Physics
      </h1>
      <p className="text-xl text-zinc-800 font-serif leading-relaxed mb-12 max-w-xl">
        Physics, then more physics, then engineering, then aerodynamics. Written the way I&apos;d explain it to a friend who&apos;s never taken a physics class and doesn&apos;t plan to.
      </p>

      <div className="space-y-16">
        {posts.length === 0 ? (
          <div className="border-dashed border-2 border-sage-dark/40 bg-sage/10 rounded-xl p-12 text-center text-ink-light font-serif">
            No physics posts yet.
          </div>
        ) : (
          posts.map(post => (
            <MotionArticleCard key={post.id} className="p-4 -mx-4 rounded-xl border border-transparent">
              <header className="mb-8">
                <h2 className="text-3xl font-semibold mb-2">
                  <Link href={`/post/${post.slug}`} className="hover:text-olive transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <time className="text-sm text-ink-light font-sans">{post.createdAt.toLocaleDateString()}</time>
              </header>

              <div className="prose-custom text-ink-light leading-relaxed space-y-6 line-clamp-[8]">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
              
              <div className="mt-6">
                <Link href={`/post/${post.slug}`} className="font-sans font-semibold text-sm text-olive hover:text-olive-dark transition-colors">
                  Read Full Post &rarr;
                </Link>
              </div>
            </MotionArticleCard>
          ))
        )}
      </div>
    </div>
  );
}
