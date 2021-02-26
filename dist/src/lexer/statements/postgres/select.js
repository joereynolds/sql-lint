"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const lexer_1 = require("../../lexer");
const types_1 = require("../../types");
const keywords_1 = require("../../../syntax/keywords");
const token_1 = require("../../token");
class Select {
    constructor() {
        this.options = [];
    }
    tokenise(query) {
        const keywords = Object.keys(keywords_1.Keyword).map((keyword) => keyword.toLowerCase());
        let lastToken = "";
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase();
                if (keywords.includes(item)) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else if (lastToken === keywords_1.Keyword.Select || lastToken === keywords_1.Keyword.From) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(types_1.Types.TableReference, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
                else if (lastToken === keywords_1.Keyword.Limit) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(types_1.Types.RowCount, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
                else {
                    line.tokens.push(new token_1.Token(types_1.Types.Unidentified, item));
                }
                lastToken = item;
            });
        });
        return query;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map