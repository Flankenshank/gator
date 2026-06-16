import fs, { read } from "fs";
import os from "os";
import path from "path";

export type Config = {
  "dbUrl": string;
  "currentUserName": string;
}

export function setUser(userName: string): void {
    let config = readConfig(); // Ensure config file exists and is valid
    const updatedConfig = { ...config, currentUserName: userName };
    writeConfig(updatedConfig);
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

export function readConfig(): Config {
  const configString = fs.readFileSync(getConfigFilePath(), "utf-8");
  const rawConfig = JSON.parse(configString);
  return validateConfig(rawConfig);
}

function writeConfig(config: Config): void {
    const rawConfig = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName,
  };
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig, null, 2), "utf-8");
}

function validateConfig(rawConfig: any): Config {
  if (typeof rawConfig !== "object" || rawConfig === null) {
    throw new Error("Config must be an object");
  }
  if (typeof rawConfig.db_url !== "string") {
    throw new Error("db_url must be a string");
  }
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name ?? "",
  };
}