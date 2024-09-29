import { db } from "@/db/drizzle";
import { urlMappings } from "@/db/schema";
import { generateHash } from "@/lib/hash";
import { NextRequest, NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const resBody = await request.json();
  const longURL = resBody.longURL;

  try {
    // Generated hash value is shortURL
    const shortURLHashValue = await generateHash(longURL);

    // Check the provided long url is already exist in the database
    const existingURL = await db
      .select()
      .from(urlMappings)
      .where(eq(urlMappings.shortUrl, shortURLHashValue));

    if (existingURL.length > 0) {
      // If existing url have same value with hashed value them return that value
      return NextResponse.json({ data: existingURL[0] }, { status: 200 });
    }

    const [urlMapping] = await db
      .insert(urlMappings)
      .values({ id: createId(), longUrl: longURL, shortUrl: shortURLHashValue })
      .returning({
        id: urlMappings.id,
        longUrl: urlMappings.longUrl,
        shortUrl: urlMappings.shortUrl,
        createdAt: urlMappings.createdAt,
      });

    return NextResponse.json({ data: urlMapping }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
