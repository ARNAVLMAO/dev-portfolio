import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    
    // Generate simple slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        category,
      }
    });

    redirect("/admin");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
      <form action={createPost} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Post Title..."
            className="w-full text-2xl font-semibold px-4 py-3 border border-sage-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 bg-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Category</label>
          <select 
            name="category" 
            required
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
            placeholder="Write your post in Markdown..."
            className="w-full px-4 py-3 border border-sage-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 bg-white font-mono text-sm leading-relaxed"
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-ink text-white font-medium px-6 py-3 rounded-lg hover:bg-ink-light transition-colors"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}
