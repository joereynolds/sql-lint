"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../lexer");
const keywords_1 = require("../keywords");
const tokens_1 = require("../tokens");
const token_1 = require("../token");
class Use {
    constructor() {
        this.options = [];
    }
    tokenise(query) {
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                let item = word.toLowerCase().trim();
                if (item === keywords_1.Keyword.Use) {
                    line.tokens.push(new token_1.Token(tokens_1.Types.Keyword, item));
                }
                else {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(tokens_1.Types.TableReference, lexer_1.cleanUnquotedIdentifier(item)));
                    }
                }
            });
        });
        return query;
    }
}
exports.Use = Use;
//# sourceMappingURL=use.js.map