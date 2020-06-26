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
        if (token.type === "keyword") {
          fixed += `${token.value.toUpperCase()}\n`;
        } else {
          fixed += token.value + "\n";
        }
      });
    });
    return fixed.trim();
  }
}

export { Fixer };
