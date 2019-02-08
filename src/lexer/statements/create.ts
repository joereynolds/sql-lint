import { Query } from "../../reader/query";
import { ILexer } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { Keyword, Types } from "../tokens";

class Create implements ILexer {
  public options: string[] = [
    "algorithm",
    "database",
    "definer",
    "event",
    "function",
    "index",
    "procedure",
    "server",
    "table",
    "tablespace",
    "temporary",
    "trigger",
    "user",
    "view"
  ];

  public tokenise(query: Query): Query {
    let lastToken = "";

    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Create) {
          line.tokens.push([Types.Keyword, item]);
        } else if (lastToken === Keyword.Create) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push([Types.Option, cleanUnquotedIdentifier(item)]);
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { Create };
