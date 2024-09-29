import React, { FormEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { setStorageItems } from "@/lib/storage";
import { URLMapping } from "@/type";

type CreateShortenUrlProps = {
  longURL: string;
  storedData: URLMapping[];
  setLongURL: React.Dispatch<React.SetStateAction<string>>;
  setShortURL: React.Dispatch<React.SetStateAction<string>>;
  setStoredData: React.Dispatch<React.SetStateAction<URLMapping[]>>;
};

export default function CreateShortenUrl({
  longURL,
  setLongURL,
  setShortURL,
  setStoredData,
}: CreateShortenUrlProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (longURL === "") return;

    setIsLoading(true);
    setProgress(0);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longURL,
          }),
          cache: "no-store",
        }
      );
      const json = await res.json();

      if (res.ok && json.data) {
        setShortURL(json.data.shortUrl);
        setStorageItems("tiny_url_shortened", json.data);
        setStoredData((prev) => {
          if (
            !prev.some((prevItem) => prevItem.shortUrl === json.data.shortUrl)
          ) {
            return [json.data, ...prev];
          }
          return [...prev];
        });
      } else {
        throw new Error("API response was not ok");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setProgress(100);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 5;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isLoading]);

  return (
    <Card className="max-w-4xl mt-10 md:mt-12 mx-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Paste the URL to be shortened
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex h-10 md:h-12 gap-1">
            <Input
              disabled={isLoading}
              value={longURL}
              onChange={(e) => setLongURL(e.target.value)}
              className="h-full text-sm md:text-[16px]"
              placeholder="Paste your long URL here..."
            />
            <Button
              disabled={isLoading}
              type="submit"
              variant={"secondary"}
              className="h-full text-sm md:text-[16px]"
            >
              Shorten URL
            </Button>
          </div>
          {isLoading && <Progress value={progress} className="w-full" />}
        </form>
      </CardContent>
      <CardFooter>
        <p>
          Make your links cleaner, more shareable, and easier to remember. Our
          URL shortener service transforms long, cluttered URLs into simple,
          clickable links in just seconds.
        </p>
      </CardFooter>
    </Card>
  );
}
