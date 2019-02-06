import { Query } from "../../reader/query";
import { ILexer } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { Keyword, Types } from "../tokens";

class Use implements ILexer {
  public tokenise(query: Query): Query {
    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Use) {
          line.tokens.push([Types.Keyword, item]);
        } else {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push([
              Types.TableReference,
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
