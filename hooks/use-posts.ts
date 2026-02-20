import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/actions/posts";
import { PostRequest } from "@/types/post";

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

async function createPost(values: PostRequest): Promise<Post[]> {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
