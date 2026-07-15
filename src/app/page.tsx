import { prisma } from "@/lib/db";
import Link from "next/link";
import { MotionPostCard } from "@/components/MotionWrappers";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Physics, flight, and whatever gadget I&apos;m currently obsessed with.
        </h1>
        <p className="text-xl text-zinc-800 font-serif leading-relaxed">
          I&apos;m Arnav. I write about two things: the tech I think you should actually buy, and the physics questions I can&apos;t stop thinking about, in that order some weeks and reversed on others. No jargon without an explanation. No post you need a degree to enjoy.
        </p>
      </section>

      {/* Recent posts feed */}
      <section>
        <h2 className="text-sm font-sans font-medium uppercase tracking-widest text-ink-light mb-8">
          Recent Writing
        </h2>

        {posts.length === 0 ? (
          <div className="border-dashed border-2 border-sage-dark/40 bg-sage/10 rounded-xl p-12 text-center text-ink-light font-serif">
            No posts yet.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <MotionPostCard href={`/post/${post.slug}`} key={post.id} className="group cursor-pointer block border border-sage-dark/30 rounded-xl p-6 hover:bg-sage/20 transition-colors duration-200">
                <article>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${post.category === 'Tech Recs' ? 'bg-cream-dark text-terracotta-dark' : 'bg-sage text-olive-dark'}`}>
                      {post.category}
                    </span>
                    <time className="text-sm text-ink-light font-sans">
                      {post.createdAt.toLocaleDateString()}
                    </time>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-olive transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-ink-light leading-relaxed line-clamp-1">
                    {post.content.substring(0, 150)}...
                  </p>
                </article>
              </MotionPostCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
