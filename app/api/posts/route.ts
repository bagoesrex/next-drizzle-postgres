import { createPost, getPosts } from "@/actions/posts";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  const res = await getPosts();

  if (!res.success) {
    return Response.json({ message: res.message, status: 500 });
  }

  return Response.json(res.data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title, content, tags } = body;

  const slug = slugify(title, { lower: true, strict: true });

  const res = await createPost({
    title,
    content,
    tags,
    slug,
  });

  if (!res.success) {
    return NextResponse.json({ message: res.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
