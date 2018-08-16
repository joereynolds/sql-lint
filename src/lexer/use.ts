import { Query } from "../reader/reader";
import { ILexer } from "./interface";
import { TOKENS } from "./tokens";

class Use implements ILexer {
  public tokenise(query: Query): Query {

    query.lines.forEach(line => {
      line.content.split(' ').forEach(word => {
        const item = word.toLowerCase().trim();
          if (item === "use") {
            line.tokens.push(["keyword", item])
          } else {
            line.tokens.push(["table_reference", item]);
          }
      });
    });

    return query;
  }
}

export { Use };
