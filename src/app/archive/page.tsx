import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { verifySession } from "@/lib/auth";
import DeletePostButton from "@/components/DeletePostButton";

export const metadata: Metadata = {
  title: "Archive — Computed",
  description: "All posts, chronologically ordered.",
};

export const dynamic = 'force-dynamic';

export default async function Archive() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });

  const session = await verifySession();
  const isAdmin = !!session;

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
        Archive
      </h1>
      <p className="text-ink-light leading-relaxed mb-12">
        Everything I&apos;ve written, in reverse chronological order.
      </p>

      <div className="border-t border-sage-dark/60">
        {posts.length === 0 ? (
          <div className="border-dashed border-2 border-sage-dark/40 bg-sage/10 rounded-xl p-12 text-center text-ink-light mt-8 font-serif">
            No posts found in the archive.
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="py-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-4 border-b border-sage-dark/30">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                <time className="text-sm text-ink-light font-sans w-28 shrink-0">
                  {post.createdAt.toLocaleDateString()}
                </time>
                <div>
                  <h3 className="font-semibold hover:text-olive transition-colors duration-200">
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <span className={`text-xs font-sans px-2 py-0.5 rounded-full mt-1 inline-block ${post.category === 'Tech Recs' ? 'bg-cream-dark text-terracotta-dark' : 'text-olive bg-sage'}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              {isAdmin && (
                <div className="mt-2 md:mt-0 flex-shrink-0">
                  <DeletePostButton id={post.id} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
