import { Query } from "../../../reader/query";
import { ILexer } from "../../interface";
import { cleanUnquotedIdentifier } from "../../lexer";
import { Types } from "../../types";
import { Keyword } from "../../../syntax/keywords";
import { Token } from "../../token";

class PostgresSelect implements ILexer {
  public options: string[] = [];

  public tokenise(query: Query): Query {
    const keywords = Object.keys(Keyword).map((keyword) =>
      keyword.toLowerCase()
    );
    let lastToken = "";
    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase();

        if (keywords.includes(item)) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Select || lastToken === Keyword.From) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
              new Token(Types.TableReference, cleanUnquotedIdentifier(item))
            );
          }
        } else if (lastToken === Keyword.Limit) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
              new Token(Types.RowCount, cleanUnquotedIdentifier(item))
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

export { PostgresSelect };
