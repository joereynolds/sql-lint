"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUse = void 0;
const lexer_1 = require("../../lexer");
const keywords_1 = require("../../../syntax/keywords");
const types_1 = require("../../types");
const token_1 = require("../../token");
class PostgresUse {
    constructor() {
        this.options = [];
    }
    tokenise(query) {
        query.lines.forEach((line) => {
            line.content.split(" ").forEach((word) => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Use) {
                    line.tokens.push(new token_1.Token(types_1.Types.Keyword, item));
                }
                else {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(types_1.Types.TableReference, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
            });
        });
        return query;
    }
}
exports.PostgresUse = PostgresUse;
//# sourceMappingURL=use.js.map