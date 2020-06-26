import { Line } from "./line";

class Query {
  public lines: Line[] = [];
  public category: string;

  public getContent() {
    let content: string = "";

    this.lines.forEach((line) => {
      content += line.content;
    });

    return content;
  }
}

export { Query };
