"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Truncate = void 0;
const lexer_1 = require("../../lexer");
const keywords_1 = require("../../../syntax/keywords");
const types_1 = require("../../types");
const token_1 = require("../../token");
class Truncate {
    constructor() {
        this.options = ["table"];
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Truncate) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else if (lastToken === keywords_1.Keyword.Truncate) {
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
exports.Truncate = Truncate;
//# sourceMappingURL=truncate.js.map