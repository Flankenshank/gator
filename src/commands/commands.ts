import { setUser } from "../config";
import { register } from "../lib/db/queries/users";

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