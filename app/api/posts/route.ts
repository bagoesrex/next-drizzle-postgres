import { getPosts } from "@/actions/posts";

export async function GET() {
  const res = await getPosts();

  if (!res.success) {
    return Response.json({ message: res.message, status: 500 });
  }

  return Response.json(res.data);
}
