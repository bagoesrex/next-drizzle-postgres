import { Post } from "@/actions/posts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

interface PostCardProps {
  post: Post;
}

dayjs.extend(relativeTime);

export default function PostCard({ post }: PostCardProps) {
  const { title, content, createdAt, tags } = post;

  const [now, setNow] = useState(() => Date.now());
  const formattedDate = dayjs(createdAt).from(now);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-md bg-white/60 p-5">
      <p className="text-muted-foreground font-mono text-sm">{formattedDate}</p>
      <h3 className="mt-2 font-sans font-bold uppercase">{title}</h3>
      <p className="line-clamp-3 text-black/75">{content}</p>
      <ul className="mt-4.5 flex gap-2">
        {tags.map((tag, i) => (
          <li
            key={i}
            className="rounded-full bg-green-300/80 px-2.5 py-0.5 text-sm font-semibold text-green-700"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
