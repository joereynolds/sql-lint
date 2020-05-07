// Generated automatically by nearley, version 2.19.2
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "statement", "symbols": ["drop_statements", "_", "terminator"]},
    {"name": "drop_statements", "symbols": ["drop_table"]},
    {"name": "drop_table", "symbols": ["keyword", "temporary", "table", "clause_if_exists", "drop_table_list", "clause_end_options"]},
    {"name": "keyword$subexpression$1", "symbols": [/[dD]/, /[rR]/, /[oO]/, /[pP]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "keyword", "symbols": ["keyword$subexpression$1", "__"], "postprocess": (word) => word.join("")},
    {"name": "temporary", "symbols": []},
    {"name": "temporary$subexpression$1", "symbols": [/[tT]/, /[eE]/, /[mM]/, /[pP]/, /[oO]/, /[rR]/, /[aA]/, /[rR]/, /[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "temporary", "symbols": ["temporary$subexpression$1", "__"]},
    {"name": "table$subexpression$1", "symbols": [/[tT]/, /[aA]/, /[bB]/, /[lL]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "table", "symbols": ["table$subexpression$1", "__"]},
    {"name": "clause_if_exists", "symbols": []},
    {"name": "clause_if_exists$subexpression$1", "symbols": [/[iI]/, /[fF]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "clause_if_exists$subexpression$2", "symbols": [/[eE]/, /[xX]/, /[iI]/, /[sS]/, /[tT]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "clause_if_exists", "symbols": ["clause_if_exists$subexpression$1", "__", "clause_if_exists$subexpression$2", "__"]},
    {"name": "clause_end_options", "symbols": []},
    {"name": "clause_end_options$subexpression$1", "symbols": [/[rR]/, /[eE]/, /[sS]/, /[tT]/, /[rR]/, /[iI]/, /[cC]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "clause_end_options", "symbols": ["__", "clause_end_options$subexpression$1", "__"]},
    {"name": "clause_end_options$subexpression$2", "symbols": [/[cC]/, /[aA]/, /[sS]/, /[cC]/, /[aA]/, /[dD]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "clause_end_options", "symbols": ["clause_end_options$subexpression$2", "__"]},
    {"name": "drop_table_list$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "drop_table_list$ebnf$1", "symbols": ["drop_table_list$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "drop_table_list", "symbols": ["drop_table_list$ebnf$1"]},
    {"name": "drop_table_list", "symbols": ["drop_table_list", "__", {"literal":","}, "drop_table_list", "_"]},
    {"name": "terminator", "symbols": [{"literal":";"}]}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
