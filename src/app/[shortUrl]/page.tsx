import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { urlMappings } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ShortURLPage({
  params,
}: {
  params: { shortUrl: string };
}) {
  const existingURL = await db
    .select()
    .from(urlMappings)
    .where(eq(urlMappings.shortUrl, params.shortUrl));

  if (existingURL.length > 0) {
    return redirect(existingURL[0].longUrl);
  } else {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="mb-2 text-2xl md:text-4xl font-bold">
          Oh! Cannot redirect your request URL
        </h1>
        <p className="text-lg text-neutral-300 md:text-xl mb-4">
          Please use correct shortened URL or generate new one
        </p>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({
              variant: "secondary",
            })
          )}
        >
          Back to home page
        </Link>
      </div>
    );
  }
}
