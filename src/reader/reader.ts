import * as fs from "fs";
import { Line } from "./line";
import { Query } from "./query";

/**
 * Grabs the querie(s) from the --file flag
 */
export function getQueryFromFile(file: string): Query[] {
  const contents = fs.readFileSync(file, "utf8");
  return putContentIntoLines(contents);
}

export function putContentIntoLines(contents: string): Query[] {
  let lineNumber = 1;
  const queriesFromFile: Query[] = [];
  let currentQueryContent: string = "";
  let query = new Query();
  const skipChars = ["", "\n", "\r\n"];

  contents = stripComments(contents);

  for (let i = 0; i < contents.length; i++) {
    if (!skipChars.includes(contents[i])) {
      currentQueryContent += contents[i];
    }

    if (contents[i] === "\n") {
      if (currentQueryContent.length > 0) {
        query.lines.push(new Line(currentQueryContent, lineNumber));
      }
      currentQueryContent = "";
      lineNumber++;
    }

    if (contents[i] === ";") {
      if (currentQueryContent.length > 0) {
        query.lines.push(new Line(currentQueryContent, lineNumber));
      }
      queriesFromFile.push(query);
      query = new Query();
      currentQueryContent = "";
    }
  }

  return queriesFromFile;
}

/**
 * 1. Split on new line
 * 2. Filter out any lines that start with a comment
 * 3. Rejoin the lines together as a single string.
 */
function stripComments(content: string): string {
  return content
    .split("\n")
    .map(line => {
      if (
        line.startsWith("--") ||
        line.startsWith("#") ||
        line.startsWith("/*")
      ) {
        return "";
      } else {
        return line;
      }
    })
    .join("\n");
}

/**
 * Grabs the query from the --query flag
 * Line is always 0 since there are no
 * lines on the terminal.
 */
export function getQueryFromLine(query: string): Query[] {
  return putContentIntoLines(query);
}
