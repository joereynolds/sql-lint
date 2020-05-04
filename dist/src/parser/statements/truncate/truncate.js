"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nearley = require("nearley");
const grammar = require("./grammar");
const types_1 = require("../../types");
const token_1 = require("../../token");
class Truncate {
    constructor() {
        this.options = ["table"];
    }
    tokenise(query) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar.default));
        const ast = parser.feed(query.getContent());
        query.lines[0].tokens.push(new token_1.Token(types_1.Types.Keyword, ast.results[0].keyword.toLowerCase().trim()));
        query.lines[0].tokens.push(new token_1.Token(types_1.Types.Option, ast.results[0].option.toLowerCase().trim()));
        return query;
    }
}
exports.Truncate = Truncate;
//# sourceMappingURL=truncate.js.map