import { createUser, getUserByName } from "../lib/db/queries/users";
import { setUser, readConfig } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length == 0) {
    throw new Error("No username provided for login command");
  }
  if (!(await getUserByName(args[0]))) {
    throw new Error(`User ${args[0]} does not exist`);
  }

  setUser(args[0]);
  console.log(`Logged in as ${args[0]}`);
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length == 0) {
    throw new Error("No username provided for new user");
  }
  if (await getUserByName(args[0])) {
    throw new Error(`User ${args[0]} already exists`);
  }
  await createUser(args[0]);
  setUser(args[0]);
  console.log(`User ${args[0]} created and logged in`);
}