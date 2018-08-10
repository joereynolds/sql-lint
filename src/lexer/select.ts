import { ILexer } from "./interface";
import { TOKENS } from "./tokens";

class Select implements ILexer { 

  public tokenise(query: string): string[][] {
    const splitQuery = query.split(" ");
    const tokenised: string[][] = [];

    let lastToken: string = "";
    splitQuery.forEach((item: string) => {
      item = item.toLowerCase();

      if (TOKENS.keyword.includes(item)) {
        tokenised.push(["keyword", item]);
      }

      if (lastToken === "select" || lastToken === "from") {
        tokenised.push(["table_reference", item]);
      }

      lastToken = item;
    });

    return tokenised;
  }
}

export { Select };
