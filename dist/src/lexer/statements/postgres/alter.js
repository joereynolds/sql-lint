"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alter = void 0;
const lexer_1 = require("../../lexer");
const types_1 = require("../../types");
const keywords_1 = require("../../../syntax/keywords");
const token_1 = require("../../token");
class Alter {
    constructor() {
        this.options = [
            "column",
            "online",
            "offline",
            "ignore",
            "database",
            "event",
            "function",
            "procedure",
            "server",
            "table",
            "tablespace",
            "view",
        ];
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Alter) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else if (lastToken === keywords_1.Keyword.Alter) {
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
exports.Alter = Alter;
//# sourceMappingURL=alter.js.map