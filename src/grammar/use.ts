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
    {"name": "use$string$1", "symbols": [{"literal":"u"}, {"literal":"s"}, {"literal":"e"}, {"literal":" "}], "postprocess": (d) => d.join('')},
    {"name": "use", "symbols": ["use$string$1", "_", "table", "_", "terminator"], "postprocess": 
        function(data) {
            return {
                table: data[2]
            };
        }
        },
    {"name": "table$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "table$ebnf$1", "symbols": ["table$ebnf$1", /[a-z]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "table", "symbols": ["table$ebnf$1"], "postprocess": 
        function(data) {
            return data[0].join("");
        }
        },
    {"name": "terminator", "symbols": [{"literal":";"}]}
  ],
  ParserStart: "use",
};

export default grammar;
