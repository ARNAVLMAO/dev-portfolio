"use server";

import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  const session = await verifySession();
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.post.delete({
    where: { id }
  });

  revalidatePath("/archive");
  revalidatePath("/");
  revalidatePath("/tech-recs");
  revalidatePath("/physics-to-flight");
}
