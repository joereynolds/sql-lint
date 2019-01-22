import * as fs from "fs";
import * as os from "os";

export const file = `${os.homedir}/.config/sql-lint/config.json`;

export function getConfiguration(config: string) {
  if (fs.existsSync(config)) {
    return JSON.parse(fs.readFileSync(config, "utf8"));
  }
  return null;
}
