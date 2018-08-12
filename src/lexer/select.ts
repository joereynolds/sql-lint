import { ILexer } from "./interface";
import { TOKENS, Tokens } from "./tokens";

class Select implements ILexer {
  public tokenise(query: string): Tokens {
    const splitQuery = query.split(" ");
    const tokens = new Tokens(query);

    let lastToken: string = "";
    splitQuery.forEach((item: string) => {
      item = item.toLowerCase();

      if (TOKENS.keyword.includes(item)) {
        tokens.addToken("keyword");
        tokens.addTokenised(["keyword", item]);
      } else if (lastToken === "select" || lastToken === "from") {
        tokens.addToken("table_reference");
        tokens.addTokenised(["table_reference", item]);
      } else {
        tokens.addToken("???");
        tokens.addTokenised(["???", item]);
      }

      lastToken = item;
    });

    return tokens;
  }
}

export { Select };
