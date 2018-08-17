import { Query } from "../reader/reader";
import { ILexer } from "./interface";
import { cleanUnquotedIdentifier } from "./lexer";
import { TOKENS } from "./tokens";

class Use implements ILexer {
  public tokenise(query: Query): Query {
    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase().trim();
        if (item === "use") {
          line.tokens.push(["keyword", item]);
        } else {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push([
              "table_reference",
              cleanUnquotedIdentifier(item)
            ]);
          }
        }
      });
    });

    return query;
  }
}

export { Use };
