"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../lexer");
const tokens_1 = require("../tokens");
class Drop {
    constructor() {
        this.options = [
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
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                let item = word.toLowerCase().trim();
                if (item === tokens_1.Keyword.Drop) {
                    line.tokens.push([tokens_1.Types.Keyword, item]);
                }
                else if (lastToken === tokens_1.Keyword.Drop) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push([tokens_1.Types.DropItem, lexer_1.cleanUnquotedIdentifier(item)]);
                    }
                }
                lastToken = item;
            });
        });
        return query;
    }
}
exports.Drop = Drop;
//# sourceMappingURL=drop.js.map