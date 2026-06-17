import { setUser } from "./config";

type CommandHandler = (cmdName: string, ...args: string[]) => void;

export function handlerLogin(cmdName: string, ...args: string[]): void {
  if (args.length == 0) {
    throw new Error("No username provided for login command");
  }

  setUser(args[0]);
  console.log(`Logged in as ${args[0]}`);
}

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(
    registry: CommandsRegistry, 
    cmdName: string, 
    handler: CommandHandler): void {
  registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): void {
  if (cmdName in registry) {
    const handler = registry[cmdName];
    handler(cmdName, ...args);
  } else {
    throw new Error(`Unknown command: ${cmdName}`);
  }
}