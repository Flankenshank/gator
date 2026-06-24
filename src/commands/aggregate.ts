import { fetchFeed } from "../lib/rss";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  const feedURL = "https://www.wagslane.dev/index.xml";
  const feedData = await fetchFeed(feedURL);
  const jsonString = JSON.stringify(feedData, null, 2);
  console.log(jsonString);
}