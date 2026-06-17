import { runCommand,CommandsRegistry,registerCommand,handlerLogin } from "./commands";

function main() {
  let registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("No command provided");
    process.exit(1);
  }
  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  try {
    runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error:", error);
    }
    process.exit(1);
  }
}

main();