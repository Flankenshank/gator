import { runCommand, CommandsRegistry, registerCommand } from "./commands/commands";
import { handlerLogin, handlerRegister, handlerReset, users } from "./commands/users";

async function main() {
  let registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", users);
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

