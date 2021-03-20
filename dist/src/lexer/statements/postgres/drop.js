"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDrop = void 0;
const lexer_1 = require("../../lexer");
const keywords_1 = require("../../../syntax/keywords");
const types_1 = require("../../types");
const token_1 = require("../../token");
class PostgresDrop {
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
            "trigger",
        ];
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Drop) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else if (lastToken === keywords_1.Keyword.Drop) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(types_1.Types.Option, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
                lastToken = item;
            });
        });
        return query;
    }
}
exports.PostgresDrop = PostgresDrop;
//# sourceMappingURL=drop.js.map