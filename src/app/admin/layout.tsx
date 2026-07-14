import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
      <header className="flex justify-between items-center mb-12 border-b border-sage-dark/30 pb-4">
        <h1 className="text-2xl font-semibold text-terracotta">Admin Dashboard</h1>
        <div className="flex gap-4 items-center">
          <Link href="/admin/new" className="text-sm font-medium bg-olive !text-cream px-4 py-2 rounded-md hover:bg-olive-dark transition-colors">
            New Post
          </Link>
          <Link href="/" className="text-sm font-medium text-ink-light hover:text-ink px-4 py-2">
            View Site
          </Link>
          <a href="/api/logout" className="text-sm font-medium text-terracotta hover:text-terracotta-dark px-4 py-2 transition-colors">
            Log Out
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}
