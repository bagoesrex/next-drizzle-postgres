"use server";

import { db } from "@/db/drizzle";
import { users as usersTable } from "@/db/schema";
import { ActionResponse } from "@/types/response";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof usersTable>;

export async function getUsers(): Promise<ActionResponse<User[]>> {
  try {
    const users = await db.select().from(usersTable);
    return { success: true, data: users };
  } catch {
    return {
      success: false,
      data: null,
      message: "Failed to fetch users",
    };
  }
}
