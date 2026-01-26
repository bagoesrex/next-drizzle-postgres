"use client";

import { getPosts, Post } from "@/actions/posts";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      const res = await getPosts();

      if (res.success) {
        setPosts(res.data!);
      } else {
        setError(res.message!);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold underline underline-offset-5">Posts</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && posts.length === 0 && <p className="text-gray-500">Belum ada data post</p>}

      {posts.length > 0 && (
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
