import * as fs from "fs";
import { Line } from "./line";
import { Query } from "./query";
import { Keyword } from "../syntax/keywords";

const reMultilineComments = /\/\*[\s\S]+?\*\//g;
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
  const skipChars = ["", Keyword.Newline, Keyword.WindowsNewline];

  contents = stripComments(contents);

  let currentQuote: string | null = null;
  let escape = false;

  for (const char of contents) {
    // \" and \' should be skipped
    if (char === "\\") {
      escape = true;
      currentQueryContent += char;
      continue;
    }

    if (escape) {
      escape = false;
      currentQueryContent += char;
      continue;
    }

    // Toggle string state
    if (char === "'" || char === '"') {
      if (currentQuote === null) {
        currentQuote = char;
      } else if (currentQuote === char) {
        currentQuote = null;
      }
      // If currentQuote is not null and doesn't match char, do nothing.
    }

    if (!skipChars.includes(char)) {
      currentQueryContent += char;
    }

    if (char === Keyword.Newline) {
      if (currentQueryContent.length > 0) {
        query.lines.push(new Line(currentQueryContent, lineNumber));
      }
      currentQueryContent = "";
      lineNumber++;
    }

    if (char === ";" && currentQuote === null) {
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
  content = content.replace(reMultilineComments, "");
  const contentInLines = content.split(Keyword.Newline);

  for (let i = 0; i < contentInLines.length; i++) {
    if (
      contentInLines[i].startsWith(Keyword.CommentDash) ||
      contentInLines[i].startsWith(Keyword.CommentHash) ||
      contentInLines[i].startsWith(Keyword.CommentMultiLineStart)
    ) {
      contentInLines[i] = "";
    }
  }

  return contentInLines.join(Keyword.Newline);
}

/**
 * Grabs the query from the --query flag
 * Line is always 0 since there are no
 * lines on the terminal.
 */
export function getQueryFromLine(query: string): Query[] {
  return putContentIntoLines(query);
}
