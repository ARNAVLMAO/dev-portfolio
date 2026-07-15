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
    <div className="relative w-full bg-[url('/spacex.avif')] bg-cover bg-center bg-no-repeat min-h-screen">
      <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
      
      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center text-white">
        {/* Hero */}
        <section className="mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white opacity-100">
            Physics, flight, and whatever gadget I&apos;m currently obsessed with.
          </h1>
          <p className="text-xl font-serif leading-relaxed text-zinc-200">
            I&apos;m Arnav. I write about two things: the tech I think you should actually buy, and the physics questions I can&apos;t stop thinking about, in that order some weeks and reversed on others. No jargon without an explanation. No post you need a degree to enjoy.
          </p>
        </section>

        {/* Recent posts feed */}
        <section className="w-full text-left">
          <h2 className="text-sm font-sans font-medium uppercase tracking-widest text-zinc-300 mb-8 text-center">
            Recent Writing
          </h2>

          {posts.length === 0 ? (
            <div className="border-dashed border-2 border-zinc-500/40 bg-black/20 rounded-xl p-12 text-center text-zinc-300 font-serif backdrop-blur-sm">
              No posts yet.
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <MotionPostCard href={`/post/${post.slug}`} key={post.id} className="group cursor-pointer block border border-zinc-600/40 rounded-xl p-6 hover:bg-white/10 transition-colors duration-200 backdrop-blur-md bg-black/40">
                  <article>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${post.category === 'Tech Recs' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-800 text-zinc-200'}`}>
                        {post.category}
                      </span>
                      <time className="text-sm text-zinc-400 font-sans">
                        {post.createdAt.toLocaleDateString()}
                      </time>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-white text-zinc-100 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed line-clamp-1">
                      {post.content.substring(0, 150)}...
                    </p>
                  </article>
                </MotionPostCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
