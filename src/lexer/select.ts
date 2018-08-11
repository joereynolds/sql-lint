import { ILexer } from "./interface";
import { TOKENS, Tokens } from "./tokens";

class Select implements ILexer { 

  public tokenise(query: string): string[][] {
    const splitQuery = query.split(" ");
    const tokenised: string[][] = [];
    const tokens = new Tokens(query);

    let lastToken: string = "";
    splitQuery.forEach((item: string) => {
      item = item.toLowerCase();

      if (TOKENS.keyword.includes(item)) {
        tokens.addToken("keyword");
        tokens.addTokenised(["keyword", item]);
        tokenised.push(["keyword", item]);
      } else if (lastToken === "select" || lastToken === "from") {
        tokens.addToken("table_reference");
        tokens.addTokenised(["table_reference", item]);
        tokenised.push(["table_reference", item]);
      } else {
        tokens.addToken("???");
        tokens.addTokenised(["???", item]);
        tokenised.push(["???", item]);
      }

      lastToken = item;
    });

    return tokenised;
  }
}

export { Select };
