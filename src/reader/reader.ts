import * as fs from "fs";

export class Query {
  public lines: Line[] = [];
  public category: string;

  public getContent() {

      let content: string = '';

      this.lines.forEach(line => {
          content += line.content

      })

      return content;
  }
}

export class Line {
  public num: number;
  public content: string;
  public tokens: string[][] = [];

  constructor(content: string, num: number) {
    this.content = content;
    this.num = num;
  }
}

/**
 * Grabs the querie(s) from the --file flag
 */
export function getQueryFromFile(file: string): Query[] {
  const contents = fs.readFileSync(file, "utf8");
  return putContentIntoLines(contents);
}

export function putContentIntoLines(contents: string): Query[] {
  let lineNumber = 1;
  const queriesFromFile: any[] = [];
  let currentQueryContent: string = "";
  let query = new Query();
  const skipChars = ["", "\n", "\r\n"];

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
 * Grabs the query from the --query flag
 * Line is always 0 since there are no
 * lines on the terminal.
 */
export function getQueryFromLine(query: string): Query[] {
  return putContentIntoLines(query);
}
