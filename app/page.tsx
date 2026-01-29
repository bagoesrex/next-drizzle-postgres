"use client";

import { usePosts } from "@/hooks/use-posts";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import PostCard from "@/components/posts/post-card";

export default function HomePage() {
  const { data: posts, isLoading, isError, error } = usePosts();

  return (
    <MaxWidthWrapper className="min-h-screen space-y-8 py-30">
      <h2 className="font-sans text-3xl font-bold">Posts</h2>
      <div>
        {isLoading && <p className="text-gray-500">Loading...</p>}

        {isError && <p className="text-red-500">{(error as Error).message}</p>}

        {!isLoading && posts?.length === 0 && <p className="text-gray-500">Belum ada data post</p>}

        {posts && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
