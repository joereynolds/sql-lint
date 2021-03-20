"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
const lexer_1 = require("../../lexer");
const keywords_1 = require("../../../syntax/keywords");
const types_1 = require("../../types");
const token_1 = require("../../token");
class Create {
    constructor() {
        this.options = [
            "algorithm",
            "database",
            "definer",
            "event",
            "function",
            "index",
            "or",
            "procedure",
            "role",
            "server",
            "schema",
            "table",
            "tablespace",
            "temporary",
            "trigger",
            "user",
            "unique",
            "view",
        ];
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Create) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else if (lastToken === keywords_1.Keyword.Create) {
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
exports.Create = Create;
//# sourceMappingURL=create.js.map