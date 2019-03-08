"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../lexer");
const tokens_1 = require("../tokens");
const token_1 = require("../token");
class Create {
    constructor() {
        this.options = [
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
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                let item = word.toLowerCase().trim();
                if (item === tokens_1.Keyword.Create) {
                    line.tokens.push(new token_1.Token(tokens_1.Types.Keyword, item));
                }
                else if (lastToken === tokens_1.Keyword.Create) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(tokens_1.Types.Option, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
                lastToken = item;
            });
        });
        return query;
    }
}
exports.Create = Create;
//# sourceMappingURL=create.js.map