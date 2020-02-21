"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer/lexer");
class Fixer {
    fix(query) {
        return this.fixKeywords(query);
    }
    fixKeywords(query) {
        query = lexer_1.tokenise(query);
        let fixed = "";
        query.lines.forEach(line => {
            line.tokens.forEach(token => {
                if (token[0] === "keyword") {
                    fixed += `${token[1].toUpperCase()}\n`;
                }
                else {
                    fixed += token[1] + "\n";
                }
            });
        });
        return fixed.trim();
    }
}
exports.Fixer = Fixer;
//# sourceMappingURL=fixer.js.map