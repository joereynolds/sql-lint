import { Line } from "./line";

class Query {
  public lines: Line[] = [];
  public category: string;

  public getContent() {
    return this.lines.map(line => line.content.trim()).join(" ");
  }
}

export { Query };
