// Generated automatically by nearley, version 2.19.2
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "use_statement", "symbols": ["keyword", "_", "table", "_", "terminator"], "postprocess": 
        function(data) {
            return {
                keyword: data[0],
                table_reference: data[2],
            };
        }
        },
    {"name": "keyword$subexpression$1", "symbols": [/[uU]/, /[sS]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "keyword", "symbols": ["keyword$subexpression$1"], "postprocess": (word) => word.join("")},
    {"name": "table$ebnf$1", "symbols": [/[A-z]/]},
    {"name": "table$ebnf$1", "symbols": ["table$ebnf$1", /[A-z]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "table", "symbols": ["table$ebnf$1"], "postprocess": (word) => word[0].join("")},
    {"name": "terminator", "symbols": [{"literal":";"}]}
  ],
  ParserStart: "use_statement",
};

export default grammar;
