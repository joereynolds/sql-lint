"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../lexer");
const tokens_1 = require("../tokens");
const token_1 = require("../token");
class Update {
    constructor() {
        this.options = [];
    }
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                let item = word.toLowerCase().trim();
                if (item === tokens_1.Keyword.Update) {
                    line.tokens.push(new token_1.Token(tokens_1.Types.Keyword, item));
                }
                else if (lastToken === tokens_1.Keyword.Update) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push(new token_1.Token(tokens_1.Types.TableReference, lexer_1.cleanUnquotedIdentifier(item)));
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