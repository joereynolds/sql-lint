import { ILexer } from "./interface";
import { TOKENS, Tokens } from "./tokens";

class Use implements ILexer {
  public tokenise(query: string): Tokens {
    const splitQuery = query.split(" ");
    const tokens = new Tokens(query);

    /**
     * A use statement is only valid in this form
     * `USE database`
     * Anything else is invalid.
     */
    const statementMaxLength = 2;

    splitQuery.forEach((item: string) => {
      item = item.toLowerCase();

      if (tokens.getTokens().length < statementMaxLength) {
        if (item === "use") {
          tokens.addToken("keyword");
          tokens.addTokenised(["keyword", item]);
        } else {
          tokens.addToken("table_reference");
          tokens.addTokenised(["table_reference", item]);
        }
      }
    });

    return tokens;
  }
}

export { Use };
