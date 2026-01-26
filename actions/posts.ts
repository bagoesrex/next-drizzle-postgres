"use server";

import { db } from "@/db/drizzle";
import { posts as postsTable } from "@/db/schema";
import { ActionResponse } from "@/types/response";
import { InferSelectModel } from "drizzle-orm";

export type Post = InferSelectModel<typeof postsTable>;

export async function getPosts(): Promise<ActionResponse<Post[]>> {
  try {
    const posts = await db.select().from(postsTable);
    return { success: true, data: posts };
  } catch {
    return {
      success: false,
      data: null,
      message: "Failed to fetch posts",
    };
  }
}
