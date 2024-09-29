import { cn } from "@/lib/utils";
import { Github, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

export default function HeaderSection() {
  return (
    <div className="w-full flex justify-end">
      <div className="flex items-center gap-2">
        <Link
          href={"https://github.com/codewithEvilxd/tiny-url"}
          target="_blank"
          className={cn(
            buttonVariants({
              variant: "outline",
            })
          )}
        >
          Give a star{" "}
          <Star className="text-yellow-500 fill-yellow-500 ml-2 size-[20px]" />
        </Link>
        <Link
          href={"https://github.com/codewithEvilxd/tiny-url"}
          target="_blank"
          className={cn(
            buttonVariants({
              variant: "ghost",
            })
          )}
        >
          <Github />
        </Link>
      </div>
    </div>
  );
}
