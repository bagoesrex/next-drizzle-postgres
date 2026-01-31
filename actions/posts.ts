"use server";

import { db } from "@/db/drizzle";
import { posts as postsTable } from "@/db/schema";
import { ActionResponse } from "@/types/response";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Post = InferSelectModel<typeof postsTable>;
export type newPost = InferInsertModel<typeof postsTable>;

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

export async function createPost(data: newPost): Promise<ActionResponse<null>> {
  try {
    await db.insert(postsTable).values(data);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      data: null,
      message: "Failed to create post",
    };
  }
}
