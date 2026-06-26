import { createFeed } from "../lib/db/queries/feeds";
import { Feed, User } from "../lib/db/schema";
import { getUser } from "../lib/db/queries/users";
import { readConfig } from "../config";
import { getFeeds } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { printFeedFollow } from "./feed-follows";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }
    const name = args[0];
    const url = args[1];
    const currentUser = readConfig().currentUserName;
    const user = await getUser(currentUser);
    if (!user) {
        throw new Error(`Current user ${currentUser} does not exist`);  
    }
    const feed = await createFeed(name, url, user.id);
    if (!feed) {
        throw new Error(`Failed to create feed ${name}`);
    }
    const feedFollow = await createFeedFollow(user.id, feed.id);
    printFeedFollow(user.name, feedFollow.feedName); 
}

function printFeed(feed: Feed, user: User) {
    Object.entries(feed).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.log(`user: ${user.name}`);
}

export async function handlerGetFeeds(cmdName: string, ...args: string[]) {
    const feeds = await getFeeds();
    if (!feeds || feeds.length === 0) {
        console.log("No feeds found");
        return;
    }
    for (const feed of feeds) {
        console.log(`${feed.name}`);
        console.log(`${feed.url}`);
        console.log(`${feed.user_name}`);
    }
}