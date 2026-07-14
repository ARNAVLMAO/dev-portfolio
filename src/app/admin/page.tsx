import { prisma } from "@/lib/db";
import Link from "next/link";

// Disable caching for this admin page so we always see fresh data
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">All Posts</h2>
      
      {posts.length === 0 ? (
        <p className="text-ink-light">No posts yet. Create your first one!</p>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between p-4 border border-sage-dark/30 rounded-xl bg-white">
              <div>
                <h3 className="font-semibold text-lg hover:text-olive transition-colors">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs bg-sage text-olive-dark px-2 py-0.5 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-ink-light">
                    {post.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Link href={`/post/${post.slug}`} className="text-sm font-medium border border-sage-dark/50 text-ink-light hover:text-ink px-3 py-1.5 rounded-md transition-colors">
                View Live
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
