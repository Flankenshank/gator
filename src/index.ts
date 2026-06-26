import { runCommand, CommandsRegistry, registerCommand } from "./commands/commands";
import { handlerLogin, handlerRegister, handlerReset, users } from "./commands/users";
import { handlerAgg } from "./commands/aggregate";
import { handlerAddFeed, handlerGetFeeds } from "./commands/feeds";
import { handlerFollow, handlerFollowing } from "./commands/feed-follows";

async function main() {
  let registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", users);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", handlerAddFeed);
  registerCommand(registry, "feeds", handlerGetFeeds);
  registerCommand(registry, "follow", handlerFollow);
  registerCommand(registry, "following", handlerFollowing);
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("No command provided");
    process.exit(1);
  }
  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error:", error);
    }
    process.exit(1);
  }
  process.exit(0)
}

main();

