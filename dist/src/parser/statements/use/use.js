"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nearley = require("nearley");
const use_grammar = require("./useGrammar");
const token_1 = require("../../token");
const types_1 = require("../../types");
// Testing: npm run build && ./dist/src/main.js -q "use test;"
class Use {
    constructor() {
        this.options = [];
    }
    tokenise(query) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(use_grammar.default));
        const ast = parser.feed(query.getContent());
        query.lines[0].tokens.push(new token_1.Token(types_1.Types.Keyword, ast.results[0].keyword.toLowerCase().trim()));
        query.lines[0].tokens.push(new token_1.Token(types_1.Types.TableReference, ast.results[0].table_reference));
        return query;
    }
}
exports.Use = Use;
//# sourceMappingURL=use.js.map