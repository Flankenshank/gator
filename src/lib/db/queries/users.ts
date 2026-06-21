import { db } from "..";
import { setUser } from "../../../config";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function register(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length == 0) {
    throw new Error("No username provided for new user");
  }
  const userName = args[0];
  if (await getUserByName(userName)) {
    throw new Error(`User ${userName} already exists`);
  }
  await createUser(userName);
  setUser(userName);
  console.log(`User ${userName} created and logged in`);
}

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length == 0) {
    throw new Error("No username provided for login command");
  }

  setUser(args[0]);
  console.log(`Logged in as ${args[0]}`);
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length == 0) {
    throw new Error("No username provided for new user");
  }
  const userName = args[0];
  if (await getUserByName(userName)) {
    throw new Error(`User ${userName} already exists`);
  }
  await createUser(userName);
  setUser(userName);
  console.log(`User ${userName} created and logged in`);
}