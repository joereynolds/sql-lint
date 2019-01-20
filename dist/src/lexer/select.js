"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer");
const tokens_1 = require("./tokens");
class Select {
    tokenise(query) {
        let lastToken = "";
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                let item = word.toLowerCase();
                if (tokens_1.TOKENS.keyword.includes(item)) {
                    line.tokens.push([tokens_1.Types.Keyword, item]);
                }
                else if (lastToken === tokens_1.Keyword.Select || lastToken === tokens_1.Keyword.From) {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push([
                            tokens_1.Types.TableReference,
                            lexer_1.cleanUnquotedIdentifier(item)
                        ]);
                    }
                }
                else {
                    line.tokens.push([tokens_1.Types.Unidentified, item]);
                }
                lastToken = item;
            });
        });
        return query;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map