import { Query } from "../reader/query";
import { ILexer } from "./interface";
import { cleanUnquotedIdentifier } from "./lexer";
import { Keyword, Types } from "./tokens";

class Update implements ILexer {
  public tokenise(query: Query): Query {
    let lastToken = "";
    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase().trim();

        if (item === Keyword.Update) {
          line.tokens.push([Types.Keyword, item]);
        } else if (lastToken === Keyword.Update) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push([
              Types.TableReference,
              cleanUnquotedIdentifier(item)
            ]);
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { Update };
