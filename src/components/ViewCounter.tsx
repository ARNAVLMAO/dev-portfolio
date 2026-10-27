"use client";

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {
        fetch("/api/views")
          .then((res) => res.json())
          .then((data) => setCount(data.count))
          .catch(() => {});
      });
  }, []);

  if (count === null) return null;

  return (
    <div className="fixed top-2 left-3 z-[100] flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span className="text-[11px] font-mono font-semibold text-red-400 tabular-nums tracking-wide">
        {count.toLocaleString()} views
      </span>
    </div>
  );
}
