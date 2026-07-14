import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <Link href="/" className="text-sm font-sans font-medium text-ink-light hover:text-ink mb-8 inline-block transition-colors">
        &larr; Back
      </Link>
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${post.category === "Tech Recs" ? "bg-cream-dark text-terracotta-dark" : "bg-sage text-olive-dark"}`}>
            {post.category}
          </span>
          <time className="text-sm text-ink-light font-sans">
            {post.createdAt.toLocaleDateString()}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
          {post.title}
        </h1>
      </header>
      <div className="prose-custom text-lg text-ink-light leading-relaxed space-y-6">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
