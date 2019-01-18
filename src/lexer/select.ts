import { Query } from "../reader/reader";
import { ILexer } from "./interface";
import { cleanUnquotedIdentifier } from "./lexer";
import { TOKENS, Keyword} from "./tokens";

class Select implements ILexer {
  public tokenise(query: Query): Query {
    let lastToken = "";
    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase();

        if (TOKENS.keyword.includes(item)) {
          line.tokens.push(["keyword", item]);
        } else if (lastToken === Keyword.Select || lastToken === Keyword.From) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push([
              "table_reference",
              cleanUnquotedIdentifier(item)
            ]);
          }
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
