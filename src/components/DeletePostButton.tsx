"use client";

import { deletePost } from "@/app/actions";
import { useTransition } from "react";

export default function DeletePostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      startTransition(async () => {
        await deletePost(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors px-3 py-1 border border-terracotta/30 rounded hover:bg-terracotta/10 disabled:opacity-50"
      title="Delete post"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
