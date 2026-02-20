import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "@/hooks/use-posts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MessageSquare } from "lucide-react";
import { Input } from "../ui/input";

const postSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title must be at most 100 characters long." }),
  content: z
    .string()
    .min(1, { message: "Title is required." })
    .max(1000, { message: "Title must be at most 1000 characters long." }),

  tags: z
    .array(z.string().min(2, { message: "Each tag must be at least 2 characters." }))
    .min(1, { message: "At least one tag is required." }),
});

export default function CreatePostDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: ["drizzle"],
    },
  });

  const { mutate: createPost } = useCreatePost();

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    createPost(values, {
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">+</Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <div>
                <DialogTitle className="flex items-center gap-3">
                  <MessageSquare size={22} strokeWidth={2} />
                  <span>Tambah Post Baru</span>
                </DialogTitle>
                <DialogDescription>Masukan detail post.</DialogDescription>
              </div>
            </DialogHeader>

            <div className="mt-5 space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
