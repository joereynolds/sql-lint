import { Query } from "../../../reader/query";
import { ILexer } from "../../interface";
import { cleanUnquotedIdentifier } from "../../lexer";
import { Keyword } from "../../../syntax/keywords";
import { Types } from "../../types";
import { Token } from "../../token";

class PostgresCreate implements ILexer {
  public options: string[] = [
    "algorithm",
    "database",
    "definer",
    "event",
    "extension",
    "function",
    "index",
    "materialized",
    "or",
    "procedure",
    "role",
    "sequence",
    "server",
    "schema",
    "table",
    "tablespace",
    "temporary",
    "temp",
    "trigger",
    "type",
    "user",
    "unique",
    "view",
  ];

  public tokenise(query: Query): Query {
    let lastToken = "";

    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Create) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Create) {
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

export { PostgresCreate };
