import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id }
  });

  if (!post) {
    notFound();
  }

  async function updatePost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;

    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        category,
        // Note: createdAt is NOT touched, so the original date is preserved
        // updatedAt is automatically set by Prisma's @updatedAt
      }
    });

    redirect("/admin");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Edit Post</h2>
      <form action={updatePost} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={post.title}
            className="w-full text-2xl font-semibold px-4 py-3 border border-sage-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Category</label>
          <select
            name="category"
            required
            defaultValue={post.category}
            className="w-full md:w-64 px-4 py-2 border border-sage-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 bg-white font-sans"
          >
            <option value="Tech Recs">Tech Recs</option>
            <option value="Physics">Physics</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Content (Markdown)</label>
          <textarea
            name="content"
            required
            rows={15}
            defaultValue={post.content}
            className="w-full px-4 py-3 border border-sage-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 bg-white font-mono text-sm leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-light font-sans">
            Originally published: {post.createdAt.toLocaleDateString()}
          </p>
          <button
            type="submit"
            className="bg-ink text-white font-medium px-6 py-3 rounded-lg hover:bg-ink-light transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
