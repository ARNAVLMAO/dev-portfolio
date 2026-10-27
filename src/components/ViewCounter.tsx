"use client";

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Fire-and-forget POST to increment, then use the returned count
    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {
        // If POST fails, try GET as fallback
        fetch("/api/views")
          .then((res) => res.json())
          .then((data) => setCount(data.count))
          .catch(() => {});
      });
  }, []);

  if (count === null) return null;

  return (
    <span className="text-xs font-sans text-ink-light/70 tabular-nums tracking-wide">
      {count.toLocaleString()} views
    </span>
  );
}
