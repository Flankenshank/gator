import { setUser } from "../config";
import { register, deleteUsers, getUsers } from "../lib/db/queries/users";
import { readConfig } from "../config";

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

export async function users(cmdName: string, ...args: string[]): Promise<void> {
  const allUsers = await getUsers();
  const currentUser = readConfig().currentUserName;
  for (const user of allUsers) {
    if (user.name === currentUser) {
      console.log(` * ${user.name} (current)`);
    } else {
      console.log(` * ${user.name}`);
    }
  }
}