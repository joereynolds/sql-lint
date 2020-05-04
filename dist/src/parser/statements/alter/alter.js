"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const nearley = require("nearley");
const alter_grammar = require("./alterGrammar");
const token_1 = require("../../token");
class Alter {
    constructor() {
        this.options = [
            "online",
            "offline",
            "ignore",
            "database",
            "event",
            "function",
            "procedure",
            "server",
            "table",
            "tablespace",
            "view"
        ];
    }
    parse(query) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(alter_grammar.default));
        const ast = parser.feed(query.getContent());
        query.lines[0].tokens.push(new token_1.Token(types_1.Types.Keyword, ast.results[0].keyword.toLowerCase().trim()));
        query.lines[0].tokens.push(new token_1.Token(types_1.Types.Option, ast.results[0].option.toLowerCase().trim()));
        return query;
    }
}
exports.Alter = Alter;
//# sourceMappingURL=alter.js.map