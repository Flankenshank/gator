import { getUser } from "./lib/db/queries/users";
import { readConfig } from "./config";
import type { CommandHandler, UserCommandHandler } from "./commands/commands";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdname: string, ...args: string[]): Promise<void> => {
        const userName = readConfig().currentUserName;
        if (userName == undefined) {
            throw new Error(`Login to proceed`)
        }
        const user = await getUser(userName);
        if (!user) {
            throw new Error(`Current user ${userName} does not exist`);  
        }
        await handler(cmdname, user, ...args);
    }
}