import { Query } from "../../reader/query";
import { ILexer } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { Keyword, Types } from "../tokens";

class Drop implements ILexer {
  public options: string[] = [
    "database",
    "event",
    "function",
    "index",
    "logfile",
    "procedure",
    "schema",
    "server",
    "table",
    "view",
    "tablespace",
    "trigger"
  ];

  public tokenise(query: Query): Query {
    let lastToken = "";

    query.lines.forEach(line => {
      line.content.split(" ").forEach(word => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Drop) {
          line.tokens.push([Types.Keyword, item]);
        } else if (lastToken === Keyword.Drop) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push([Types.DropItem, cleanUnquotedIdentifier(item)]);
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { Drop };
