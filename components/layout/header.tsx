import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed w-full border-b bg-white/80 px-0 backdrop-blur-lg">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.75">
        <Link href={"/"} className="flex items-center gap-3">
          <div className="rounded-md bg-emerald-400 p-2.5 text-white">
            <MessageSquare size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Postly</h1>
            <p className="text-muted-foreground text-xs">Share your posts and comments</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
