import { getFeedByUrl } from "../lib/db/queries/feeds";
import { createFeedFollow, getFeedFollowsForUser, unfollow } from "../lib/db/queries/feed-follows";
import { feedFollows, User } from "../lib/db/schema";

export function printFeedFollow(userName: string, feedName: string) {
    console.log(`${feedName} - ${userName}`)
}

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0];
    const feed = await getFeedByUrl(url)
    if (user == undefined || feed == undefined) {
        throw new Error(`user or feed undefined`);
    }
    await createFeedFollow(user.id, feed.id);
    printFeedFollow(user.name, feed.name)
}

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    if (user == undefined) {
        throw new Error(`user not found`);
    }
    const feeds = await getFeedFollowsForUser(user.id);
    for (const feed of feeds) {
        console.log(feed.feedName)
    }
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const url = args[0];
    const feed = await getFeedByUrl(url)
    if (user == undefined || feed == undefined) {
        throw new Error(`user or feed undefined`);
    }
    if (user == undefined) {
        throw new Error(`user not found`);
    }
    await unfollow(user.id, feed.id)
}