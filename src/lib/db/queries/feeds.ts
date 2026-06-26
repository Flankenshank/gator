import { db } from "..";
import { eq } from "drizzle-orm";
import { feeds, users } from "../schema";
import { firstOrUndefined } from "./utils"

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db.insert(feeds).values({ name, url, userId }).returning();
  return result;
}

export async function getFeeds () {
  return await db
  .select({
    name: feeds.name,
    url: feeds.url,
    user_name: users.name
  })
  .from(feeds)
  .innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedByUrl (url: string) {
  const result = await db
  .select()
  .from(feeds)
  .where(eq(feeds.url, url));
  return firstOrUndefined(result)
}