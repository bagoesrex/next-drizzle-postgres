"use client";

import { usePosts } from "@/hooks/use-posts";

export default function HomePage() {
  const { data: posts, isLoading, isError, error } = usePosts();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold underline underline-offset-4">Posts</h1>

      {isLoading && <p className="text-gray-500">Loading...</p>}

      {isError && <p className="text-red-500">{(error as Error).message}</p>}

      {!isLoading && posts?.length === 0 && <p className="text-gray-500">Belum ada data post</p>}

      {posts && posts.length > 0 && (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="py-2">
              <h2 className="font-bold">{post.title}</h2>
              <p className="text-sm">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
