import * as fs from "fs";
import * as path from "path";

export function findByExtension(
  base: string,
  ext: string,
  files?: string[],
  result?: string[]
) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach((file) => {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = findByExtension(newbase, ext, fs.readdirSync(newbase), result);
    } else {
      if (
        file.substr(-1 * (ext.length + 1)) === "." + ext &&
        typeof result !== "undefined"
      ) {
        result.push(newbase);
      }
    }
  });
  return result;
}
