"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../lexer");
const tokens_1 = require("../tokens");
class Use {
    tokenise(query) {
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                let item = word.toLowerCase().trim();
                if (item === tokens_1.Keyword.Use) {
                    line.tokens.push([tokens_1.Types.Keyword, item]);
                }
                else {
                    item = lexer_1.cleanUnquotedIdentifier(item);
                    if (item.length > 0) {
                        line.tokens.push([
                            tokens_1.Types.TableReference,
                            lexer_1.cleanUnquotedIdentifier(item)
                        ]);
                    }
                }
            });
        });
        return query;
    }
}
exports.Use = Use;
//# sourceMappingURL=use.js.map