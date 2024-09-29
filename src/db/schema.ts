import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const urlMappings = pgTable("url_mappings", {
  id: text("id").primaryKey(),
  longUrl: text("long_url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
