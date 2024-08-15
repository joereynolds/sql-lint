import { Query } from "../../../reader/query";
import { ILexer } from "../../interface";
import { cleanUnquotedIdentifier } from "../../lexer";
import { Types } from "../../types";
import { Keyword } from "../../../syntax/keywords";
import { Token } from "../../token";

class PostgresAlter implements ILexer {
  public options: string[] = [
    "column",
    "online",
    "offline",
    "ignore",
    "database",
    "default",
    "event",
    "function",
    "procedure",
    "sequence",
    "server",
    "table",
    "tablespace",
    "type",
    "view",
  ];

  public tokenise(query: Query): Query {
    let lastToken = "";

    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Alter) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Alter) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
              new Token(Types.Option, cleanUnquotedIdentifier(item))
            );
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { PostgresAlter };
