import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as process from "process";

export const file_local = ".sql-lint.json";
export const file = `${os.homedir}/.config/sql-lint/config.json`;

export function getConfiguration(config: string) {
  if (fs.existsSync(config)) {
    return JSON.parse(fs.readFileSync(config, "utf8"));
  }
  return null;
}

export function findConfiguration() {
  var dir = process.cwd();
  while (dir != "/") {
    var config = path.join([dir, file_local]);
    if (fs.existsSync(config)) {
      return JSON.parse(fs.readFileSync(config, "utf8"));
    }
    dir = path.dirname(dir);
  }

  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }

  return null;
}
