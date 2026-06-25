import { setUser } from "../config";
import { register, deleteUsers, getUsers } from "../lib/db/queries/users";
import { readConfig } from "../config";
import { createFeed } from "../lib/db/queries/feeds";

type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(
    registry: CommandsRegistry, 
    cmdName: string, 
    handler: CommandHandler): void {
  registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): Promise<void> {
  if (cmdName in registry) {
    const handler = registry[cmdName];
    await handler(cmdName, ...args);
  } else {
    throw new Error(`Unknown command: ${cmdName}`);
  }
}

export async function reset(cmdName: string, ...args: string[]): Promise<void> {
  await deleteUsers();
}