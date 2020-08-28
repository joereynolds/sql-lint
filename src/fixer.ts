import { Query } from "./reader/query";
import { tokenise } from "./lexer/lexer";

class Fixer {
  public fix(query: Query) {
    return this.fixKeywords(query);
  }

  private fixKeywords(query: Query) {
    query = tokenise(query);

    let fixed: string = "";

    query.lines.forEach((line) => {
      line.tokens.forEach((token) => {
        // If the token is just '', skip over it otherwise
        // we insert unneccessary lines.
        if (token.value) {
          if (token.type === "keyword") {
            fixed += `${token.value.toUpperCase()}\n`;
          } else {
            fixed += token.value + "\n";
          }
        }
      });
    });
    return fixed.trim();
  }
}

export { Fixer };
