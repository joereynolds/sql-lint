import { Query } from "../../reader/query";
import { ILexer } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { TOKENS, Keyword, Types } from "../tokens";
import { Token } from "../token";

class Select implements ILexer {
  public tokenise(query: Query): Query {
    let lastToken = "";
    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase();

        if (TOKENS.keyword.includes(item)) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Select || lastToken === Keyword.From) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
              new Token(Types.TableReference, cleanUnquotedIdentifier(item))
            );
          }
        } else {
          line.tokens.push(new Token(Types.Unidentified, item));
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { Select };
