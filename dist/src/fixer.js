"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fixer = void 0;
const lexer_1 = require("./lexer/lexer");
class Fixer {
    fix(query) {
        return this.fixKeywords(query);
    }
    fixKeywords(query) {
        query = lexer_1.tokenise(query);
        let fixed = "";
        query.lines.forEach((line) => {
            line.tokens.forEach((token) => {
                // If the token is just '', skip over it otherwise
                // we insert unneccessary lines.
                if (token.value) {
                    if (token.type === "keyword") {
                        fixed += `${token.value.toUpperCase()}\n`;
                    }
                    else {
                        fixed += token.value + "\n";
                    }
                }
            });
        });
        return fixed.trim();
    }
}
exports.Fixer = Fixer;
//# sourceMappingURL=fixer.js.map