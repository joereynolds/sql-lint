"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version 2.19.2
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const moo = require("moo");
const lexer = moo.compile({
    keyword: ['update', 'UPDATE'],
    ws: /[ \t]+/,
    option: /[A-z\.]+/,
    terminator: ";",
    everything_else: /[A-z]+/,
});
;
;
;
;
const grammar = {
    Lexer: lexer,
    ParserRules: [
        { "name": "_$ebnf$1", "symbols": [] },
        { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function (d) { return null; } },
        { "name": "__$ebnf$1", "symbols": ["wschar"] },
        { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function (d) { return null; } },
        { "name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id },
        { "name": "statement", "symbols": [(lexer.has("keyword") ? { type: "keyword" } : keyword), "_", (lexer.has("option") ? { type: "option" } : option), "_", (lexer.has("terminator") ? { type: "terminator" } : terminator)], "postprocess": function (data) {
                return {
                    keyword: data[0],
                    option: data[2],
                };
            }
        }
    ],
    ParserStart: "statement",
};
exports.default = grammar;
//# sourceMappingURL=grammar.js.map