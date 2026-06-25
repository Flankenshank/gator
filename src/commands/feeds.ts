import { createFeed } from "../lib/db/queries/feeds";
import { Feed, User } from "../lib/db/schema";
import { getUserByName } from "../lib/db/queries/users";
import { readConfig } from "../config";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }
    const name = args[0];
    const url = args[1];
    const currentUser = readConfig().currentUserName;
    const user = await getUserByName(currentUser);
    if (!user) {
        throw new Error(`Current user ${currentUser} does not exist`);  
    }
    const feed = await createFeed(name, url, user.id);
    if (!feed) {
        throw new Error(`Failed to create feed ${name}`);
    }
    printFeed(feed, user);  
}

function printFeed(feed: Feed, user: User) {
    Object.entries(feed).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.log(`user: ${user.name}`);
}