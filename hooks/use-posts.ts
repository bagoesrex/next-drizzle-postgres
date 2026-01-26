import { useQuery } from "@tanstack/react-query";
import { Post } from "@/actions/posts";

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}
