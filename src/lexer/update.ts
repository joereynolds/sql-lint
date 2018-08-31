import { Keyword } from "./tokens";
import { ILexer } from "./interface";
import { Query, Line } from "../reader/reader";
import { cleanUnquotedIdentifier } from "./lexer";

class Update implements ILexer {
    private lastToken: string|null = null;

    public tokenise(query: Query): Query {
        this.lastToken = "";
        query.lines.forEach(this.findUpdateStatementInLine);
        return query;
    }

    private findUpdateStatementInLine(line: Line): void {
        line.content.split(" ").forEach(word => {
            const item = word.toLowerCase();

            if (Object.values(Keyword).includes(item)) {
                /**
                 * Why are we checking for all keywords here?
                 */
                line.tokens.push(["keywords", item]);
            } else if (Keyword.Update === this.lastToken)  {
                this.handleTableReference(word, line);
            } else {
                line.tokens.push(["???", item]);
            }

            this.lastToken = item;
        });
    }

    private handleTableReference(word: string, line: Line): void {
        const item = cleanUnquotedIdentifier(word.toLowerCase());

        if (item.length > 0) {
          line.tokens.push([
            "table_reference",
            cleanUnquotedIdentifier(item)
          ]);
        }
    }
}

export { Update };
