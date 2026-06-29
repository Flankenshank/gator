import { fetchFeed } from "../lib/rss";
import { getNextFeedToFetch, getFeedByUrl, markFeedFetched } from "../lib/db/queries/feeds";
import { parseDuration } from "../lib/time";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
        throw new Error(`Please enter a valid duration`);
    }
    const duration = args[0];
    const parsedDuration = parseDuration(duration)
    if (!parsedDuration) {
      throw new Error(`Invalid input`);
    }
    console.log(`Collecting feeds every ${duration}`)

    scrapeFeeds().catch(handleError);
    
    const interval = setInterval(() => {
      scrapeFeeds().catch(handleError);
    }, parsedDuration);
    
    await new Promise<void>((resolve) => {
      process.on("SIGINT", () => {
        console.log("Shutting down feed aggregator...");
        clearInterval(interval);
        resolve();
      });
    });
  }

export async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch()

  if (!nextFeed) {
    console.log("No feeds found to scrape");
    return;
  }

  try {
    const feedData = await fetchFeed(nextFeed.url);
    await markFeedFetched(nextFeed.id);

    if (!feedData || !feedData.channel.item) {
      console.log(`Feed "${nextFeed.name}" has no items.`);
      return
    }
    for (const item of feedData.channel.item) {
      console.log(item.title || "Untitled Article");
    }

} catch (error) {
  console.error(`Failed to scrape feed ${nextFeed.id}: `, error);
}
}

function handleError(error: any) {
  console.error(`Error: ${error}`)
}