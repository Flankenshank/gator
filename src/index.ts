import { setUser,readConfig } from "./config";

function main() {
  setUser("Dylan");
  console.log(readConfig());
}

main();