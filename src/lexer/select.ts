import { Query } from "../reader/reader";
import { ILexer } from "./interface";
import { TOKENS } from "./tokens";

class Select implements ILexer {
  public tokenise(query: Query): Query {

    let lastToken = "";
    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        const item = word.toLowerCase();

        if (TOKENS.keyword.includes(item)) {
          line.tokens.push(["keyword", item]);
        } else if (lastToken === "select" || lastToken === "from") {
          line.tokens.push(["table_reference", item]);
        } else {
          line.tokens.push(["???", item]);
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { Select };
