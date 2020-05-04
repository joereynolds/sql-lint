"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nearley = require("nearley");
const use_grammar = require("./useGrammar");
const token_1 = require("../../token");
// Testing: npm run build && ./dist/src/main.js -q "use test;"
class Use {
    constructor() {
        this.options = [];
    }
    parse(query) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(use_grammar.default));
        const ast = parser.feed(query.getContent());
        query.lines[0].tokens.push(new token_1.Token(ast.results[0].keyword.type, ast.results[0].keyword.value.toLowerCase().trim()));
        query.lines[0].tokens.push(new token_1.Token(ast.results[0].table_reference.type, ast.results[0].table_reference.value));
        return query;
    }
}
exports.Use = Use;
//# sourceMappingURL=use.js.map