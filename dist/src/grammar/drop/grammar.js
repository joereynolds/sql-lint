"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version 2.19.2
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
;
;
;
;
const grammar = {
    Lexer: undefined,
    ParserRules: [
        { "name": "_$ebnf$1", "symbols": [] },
        { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function (d) { return null; } },
        { "name": "__$ebnf$1", "symbols": ["wschar"] },
        { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function (d) { return null; } },
        { "name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id },
        { "name": "statement", "symbols": ["drop_statements", "_", "terminator"] },
        { "name": "drop_statements", "symbols": ["drop_table"] },
        { "name": "drop_statements", "symbols": ["drop_database"] },
        { "name": "drop_statements", "symbols": ["drop_function"] },
        { "name": "drop_statements", "symbols": ["drop_event"] },
        { "name": "drop_table", "symbols": ["keyword", "temporary", "table", "clause_if_exists", "name_list", "clause_end_options"] },
        { "name": "drop_database", "symbols": ["keyword", "clause_database_or_schema", "_", "clause_if_exists", "drop_database_specifier"] },
        { "name": "drop_event", "symbols": ["keyword", "event", "clause_if_exists", "name"] },
        { "name": "drop_function", "symbols": ["keyword", "function", "name"] },
        { "name": "drop_view", "symbols": ["keyword", "view", "clause_if_exists", "name_list", "clause_end_options"] },
        { "name": "keyword$subexpression$1", "symbols": [/[dD]/, /[rR]/, /[oO]/, /[pP]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "keyword", "symbols": ["keyword$subexpression$1", "__"], "postprocess": (word) => word.join("") },
        { "name": "temporary", "symbols": [] },
        { "name": "temporary$subexpression$1", "symbols": [/[tT]/, /[eE]/, /[mM]/, /[pP]/, /[oO]/, /[rR]/, /[aA]/, /[rR]/, /[yY]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "temporary", "symbols": ["temporary$subexpression$1", "__"] },
        { "name": "table$subexpression$1", "symbols": [/[tT]/, /[aA]/, /[bB]/, /[lL]/, /[eE]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "table", "symbols": ["table$subexpression$1", "__"] },
        { "name": "event$subexpression$1", "symbols": [/[eE]/, /[vV]/, /[eE]/, /[nN]/, /[tT]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "event", "symbols": ["event$subexpression$1", "__"] },
        { "name": "function$subexpression$1", "symbols": [/[fF]/, /[uU]/, /[nN]/, /[cC]/, /[tT]/, /[iI]/, /[oO]/, /[nN]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "function", "symbols": ["function$subexpression$1", "__"] },
        { "name": "view$subexpression$1", "symbols": [/[vV]/, /[iI]/, /[eE]/, /[wW]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "view", "symbols": ["view$subexpression$1", "__"] },
        { "name": "clause_database_or_schema$subexpression$1", "symbols": [/[dD]/, /[aA]/, /[tT]/, /[aA]/, /[bB]/, /[aA]/, /[sS]/, /[eE]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "clause_database_or_schema", "symbols": ["clause_database_or_schema$subexpression$1", "__"] },
        { "name": "clause_database_or_schema$subexpression$2", "symbols": [/[sS]/, /[cC]/, /[hH]/, /[eE]/, /[mM]/, /[aA]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "clause_database_or_schema", "symbols": ["clause_database_or_schema$subexpression$2", "__"] },
        { "name": "clause_if_exists", "symbols": [] },
        { "name": "clause_if_exists$subexpression$1", "symbols": [/[iI]/, /[fF]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "clause_if_exists$subexpression$2", "symbols": [/[eE]/, /[xX]/, /[iI]/, /[sS]/, /[tT]/, /[sS]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "clause_if_exists", "symbols": ["clause_if_exists$subexpression$1", "__", "clause_if_exists$subexpression$2", "__"] },
        { "name": "clause_end_options", "symbols": [] },
        { "name": "clause_end_options$subexpression$1", "symbols": [/[rR]/, /[eE]/, /[sS]/, /[tT]/, /[rR]/, /[iI]/, /[cC]/, /[tT]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "clause_end_options", "symbols": ["__", "clause_end_options$subexpression$1", "__"] },
        { "name": "clause_end_options$subexpression$2", "symbols": [/[cC]/, /[aA]/, /[sS]/, /[cC]/, /[aA]/, /[dD]/, /[eE]/], "postprocess": function (d) { return d.join(""); } },
        { "name": "clause_end_options", "symbols": ["clause_end_options$subexpression$2", "__"] },
        { "name": "name$ebnf$1", "symbols": [/[a-z]/] },
        { "name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[a-z]/], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "name", "symbols": ["name$ebnf$1"] },
        { "name": "name_list", "symbols": ["name"] },
        { "name": "name_list", "symbols": ["name_list", "__", { "literal": "," }, "name_list", "_"] },
        { "name": "drop_database_specifier$ebnf$1", "symbols": [/[a-z]/] },
        { "name": "drop_database_specifier$ebnf$1", "symbols": ["drop_database_specifier$ebnf$1", /[a-z]/], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "drop_database_specifier", "symbols": ["drop_database_specifier$ebnf$1"] },
        { "name": "terminator", "symbols": [{ "literal": ";" }] }
    ],
    ParserStart: "statement",
};
exports.default = grammar;
//# sourceMappingURL=grammar.js.map