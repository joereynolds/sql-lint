import { Query } from "../../reader/query";
import { IParser } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { Keyword } from "../../syntax/keywords";
import { Types } from "../types";
import { Token } from "../token";

class Create implements IParser {
  public options: string[] = [
    "algorithm",
    "database",
    "definer",
    "event",
    "function",
    "index",
    "or",
    "procedure",
    "server",
    "table",
    "tablespace",
    "temporary",
    "trigger",
    "user",
    "unique",
    "view"
  ];

  public parse(query: Query): Query {
    let lastToken = "";

    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
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

export { Create };
