import { Post } from "@/actions/posts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

interface PostCardProps {
  post: Post;
}

dayjs.extend(relativeTime);

export default function PostCard({ post }: PostCardProps) {
  const { title, content, createdAt } = post;

  const [now, setNow] = useState(() => Date.now());
  const formattedDate = dayjs(createdAt).from(now);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="text-muted-foreground font-mono text-sm">{formattedDate}</p>
      <h3 className="font-sans font-bold uppercase">{title}</h3>
      <p className="line-clamp-3 text-black/75">{content}</p>
    </div>
  );
}
