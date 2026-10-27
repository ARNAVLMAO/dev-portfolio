import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET: return current count
export async function GET() {
  const record = await prisma.siteView.upsert({
    where: { id: "global" },
    update: {},
    create: { id: "global", count: 0 },
  });

  return NextResponse.json({ count: record.count });
}

// POST: increment and return new count
export async function POST() {
  const record = await prisma.siteView.upsert({
    where: { id: "global" },
    update: { count: { increment: 1 } },
    create: { id: "global", count: 1 },
  });

  return NextResponse.json({ count: record.count });
}
