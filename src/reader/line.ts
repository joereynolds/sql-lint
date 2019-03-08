import { Token } from "../lexer/token";

class Line {
  public num: number;
  public content: string;
  public tokens: Token[] = [];

  constructor(content: string, num: number) {
    this.content = content;
    this.num = num;
  }
}

export { Line };
