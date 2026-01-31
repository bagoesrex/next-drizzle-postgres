ALTER TABLE "posts" ALTER COLUMN "title" SET DATA TYPE varchar(220);--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "slug" varchar(220) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "tags" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_slug_unique" UNIQUE("slug");