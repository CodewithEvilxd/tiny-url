"use client";

import { URLMapping } from "@/type";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeStorageItemsByHashValue } from "@/lib/storage";

export const columns = (
  updateCallback: () => void
): ColumnDef<URLMapping>[] => [
  {
    accessorKey: "shortUrl",
    header: "Short URL",
  },
  {
    accessorKey: "longUrl",
    header: "Long URL",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const urlMapping = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_APP_URL}/${urlMapping.shortUrl}`
                )
              }
            >
              Copy shortened URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(urlMapping.longUrl)}
            >
              Copy long URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                removeStorageItemsByHashValue(
                  "tiny_url_shortened",
                  urlMapping.shortUrl
                );
                updateCallback();
              }}
              className="text-red-500 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
