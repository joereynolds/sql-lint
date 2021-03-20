"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
const lexer_1 = require("../../lexer");
const types_1 = require("../../types");
const keywords_1 = require("../../../syntax/keywords");
const token_1 = require("../../token");
class Update {
    constructor() {
        this.options = [];
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Update) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else if (lastToken === keywords_1.Keyword.Update) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(types_1.Types.TableReference, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
                lastToken = item;
            });
        });
        return query;
    }
}
exports.Update = Update;
//# sourceMappingURL=update.js.map