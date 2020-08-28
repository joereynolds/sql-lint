// Generated automatically by nearley, version 2.19.6
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
  return d[0];
}

interface NearleyToken {
  value: any;
  [key: string]: any;
}

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
}

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}

type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
}

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    { name: "_$ebnf$1", symbols: [] },
    {
      name: "_$ebnf$1",
      symbols: ["_$ebnf$1", "wschar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "_",
      symbols: ["_$ebnf$1"],
      postprocess(d) {
        return null;
      },
    },
    { name: "__$ebnf$1", symbols: ["wschar"] },
    {
      name: "__$ebnf$1",
      symbols: ["__$ebnf$1", "wschar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "__",
      symbols: ["__$ebnf$1"],
      postprocess(d) {
        return null;
      },
    },
    { name: "wschar", symbols: [/[ \t\n\v\f]/], postprocess: id },
    {
      name: "clause_database_or_schema$subexpression$1",
      symbols: [/[dD]/, /[aA]/, /[tT]/, /[aA]/, /[bB]/, /[aA]/, /[sS]/, /[eE]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_database_or_schema",
      symbols: ["clause_database_or_schema$subexpression$1", "__"],
    },
    {
      name: "clause_database_or_schema$subexpression$2",
      symbols: [/[sS]/, /[cC]/, /[hH]/, /[eE]/, /[mM]/, /[aA]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_database_or_schema",
      symbols: ["clause_database_or_schema$subexpression$2", "__"],
    },
    { name: "clause_if_exists", symbols: [] },
    {
      name: "clause_if_exists$subexpression$1",
      symbols: [/[iI]/, /[fF]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_if_exists$subexpression$2",
      symbols: [/[eE]/, /[xX]/, /[iI]/, /[sS]/, /[tT]/, /[sS]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_if_exists",
      symbols: [
        "clause_if_exists$subexpression$1",
        "__",
        "clause_if_exists$subexpression$2",
        "__",
      ],
    },
    { name: "clause_if_not_exists", symbols: [] },
    {
      name: "clause_if_not_exists$subexpression$1",
      symbols: [/[iI]/, /[fF]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_if_not_exists$subexpression$2",
      symbols: [/[nN]/, /[oO]/, /[tT]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_if_not_exists$subexpression$3",
      symbols: [/[eE]/, /[xX]/, /[iI]/, /[sS]/, /[tT]/, /[sS]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_if_not_exists",
      symbols: [
        "clause_if_not_exists$subexpression$1",
        "__",
        "clause_if_not_exists$subexpression$2",
        "__",
        "clause_if_not_exists$subexpression$3",
        "__",
      ],
    },
    { name: "name$ebnf$1", symbols: [/[a-z]/] },
    {
      name: "name$ebnf$1",
      symbols: ["name$ebnf$1", /[a-z]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "name",
      symbols: ["name$ebnf$1"],
      postprocess: (word) => word[0].join(""),
    },
    { name: "name_list", symbols: ["name"] },
    {
      name: "name_list",
      symbols: ["name_list", "__", { literal: "," }, "name_list", "_"],
    },
    { name: "terminator", symbols: [{ literal: ";" }] },
    { name: "equals", symbols: [{ literal: "=" }] },
    { name: "optional_equals", symbols: [] },
    { name: "optional_equals", symbols: ["equals"] },
    { name: "yes", symbols: [{ literal: "Y" }] },
    { name: "no", symbols: [{ literal: "N" }] },
    { name: "yes_or_no", symbols: ["yes"] },
    { name: "yes_or_no", symbols: ["no"] },
    {
      name: "trigger$subexpression$1",
      symbols: [/[tT]/, /[rR]/, /[iI]/, /[gG]/, /[gG]/, /[eE]/, /[rR]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "trigger", symbols: ["trigger$subexpression$1", "__"] },
    { name: "statement", symbols: ["drop_statements", "_", "terminator"] },
    { name: "drop_statements", symbols: ["drop_table"] },
    { name: "drop_statements", symbols: ["drop_database"] },
    { name: "drop_statements", symbols: ["drop_function"] },
    { name: "drop_statements", symbols: ["drop_procedure"] },
    { name: "drop_statements", symbols: ["drop_event"] },
    { name: "drop_statements", symbols: ["drop_view"] },
    { name: "drop_statements", symbols: ["drop_server"] },
    { name: "drop_statements", symbols: ["drop_spatial_reference_system"] },
    { name: "drop_statements", symbols: ["drop_logfile_group"] },
    { name: "drop_statements", symbols: ["drop_trigger"] },
    {
      name: "drop_table",
      symbols: [
        "keyword",
        "temporary",
        "table",
        "clause_if_exists",
        "name_list",
        "clause_end_options",
      ],
    },
    {
      name: "drop_database",
      symbols: [
        "keyword",
        "clause_database_or_schema",
        "_",
        "clause_if_exists",
        "name",
      ],
    },
    {
      name: "drop_event",
      symbols: ["keyword", "event", "clause_if_exists", "name"],
    },
    {
      name: "drop_function",
      symbols: ["keyword", "function", "clause_if_exists", "name"],
    },
    {
      name: "drop_procedure",
      symbols: ["keyword", "procedure", "clause_if_exists", "name"],
    },
    {
      name: "drop_view",
      symbols: [
        "keyword",
        "view",
        "clause_if_exists",
        "name_list",
        "clause_end_options",
      ],
    },
    {
      name: "drop_server",
      symbols: ["keyword", "server", "clause_if_exists", "name"],
    },
    {
      name: "drop_spatial_reference_system",
      symbols: [
        "keyword",
        "spatial_reference_system",
        "clause_if_exists",
        "name",
      ],
    },
    {
      name: "drop_trigger",
      symbols: ["keyword", "trigger", "clause_if_exists", "name"],
      postprocess(statement) {
        return {
          statement_type: statement[0],
          trigger: statement[3],
        };
      },
    },
    {
      name: "drop_logfile_group",
      symbols: [
        "keyword",
        "logfile",
        "group",
        "name",
        "__",
        "engine",
        "optional_equals",
        "_",
        "name",
      ],
      postprocess(statement) {
        return {
          statement_type: statement[0],
          logfile: statement[3],
          engine: statement[8],
        };
      },
    },
    {
      name: "keyword$subexpression$1",
      symbols: [/[dD]/, /[rR]/, /[oO]/, /[pP]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "keyword",
      symbols: ["keyword$subexpression$1", "__"],
      postprocess: (word) => word.join(""),
    },
    {
      name: "engine$subexpression$1",
      symbols: [/[eE]/, /[nN]/, /[gG]/, /[iI]/, /[nN]/, /[eE]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "engine", symbols: ["engine$subexpression$1", "__"] },
    {
      name: "logfile$subexpression$1",
      symbols: [/[lL]/, /[oO]/, /[gG]/, /[fF]/, /[iI]/, /[lL]/, /[eE]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "logfile", symbols: ["logfile$subexpression$1", "__"] },
    {
      name: "group$subexpression$1",
      symbols: [/[gG]/, /[rR]/, /[oO]/, /[uU]/, /[pP]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "group", symbols: ["group$subexpression$1", "__"] },
    { name: "temporary", symbols: [] },
    {
      name: "temporary$subexpression$1",
      symbols: [
        /[tT]/,
        /[eE]/,
        /[mM]/,
        /[pP]/,
        /[oO]/,
        /[rR]/,
        /[aA]/,
        /[rR]/,
        /[yY]/,
      ],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "temporary", symbols: ["temporary$subexpression$1", "__"] },
    {
      name: "table$subexpression$1",
      symbols: [/[tT]/, /[aA]/, /[bB]/, /[lL]/, /[eE]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "table", symbols: ["table$subexpression$1", "__"] },
    {
      name: "event$subexpression$1",
      symbols: [/[eE]/, /[vV]/, /[eE]/, /[nN]/, /[tT]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "event", symbols: ["event$subexpression$1", "__"] },
    {
      name: "function$subexpression$1",
      symbols: [/[fF]/, /[uU]/, /[nN]/, /[cC]/, /[tT]/, /[iI]/, /[oO]/, /[nN]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "function", symbols: ["function$subexpression$1", "__"] },
    {
      name: "procedure$subexpression$1",
      symbols: [
        /[pP]/,
        /[rR]/,
        /[oO]/,
        /[cC]/,
        /[eE]/,
        /[dD]/,
        /[uU]/,
        /[rR]/,
        /[eE]/,
      ],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "procedure",
      symbols: ["procedure$subexpression$1", "__"],
      postprocess: (word) => word.join(""),
    },
    {
      name: "view$subexpression$1",
      symbols: [/[vV]/, /[iI]/, /[eE]/, /[wW]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "view", symbols: ["view$subexpression$1", "__"] },
    {
      name: "server$subexpression$1",
      symbols: [/[sS]/, /[eE]/, /[rR]/, /[vV]/, /[eE]/, /[rR]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "server", symbols: ["server$subexpression$1", "__"] },
    {
      name: "spatial_reference_system$subexpression$1",
      symbols: [/[sS]/, /[pP]/, /[aA]/, /[tT]/, /[iI]/, /[aA]/, /[lL]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "spatial_reference_system$subexpression$2",
      symbols: [
        /[rR]/,
        /[eE]/,
        /[fF]/,
        /[eE]/,
        /[rR]/,
        /[eE]/,
        /[nN]/,
        /[cC]/,
        /[eE]/,
      ],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "spatial_reference_system$subexpression$3",
      symbols: [/[sS]/, /[yY]/, /[sS]/, /[tT]/, /[eE]/, /[mM]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "spatial_reference_system",
      symbols: [
        "spatial_reference_system$subexpression$1",
        "__",
        "spatial_reference_system$subexpression$2",
        "__",
        "spatial_reference_system$subexpression$3",
        "__",
      ],
    },
    { name: "clause_end_options", symbols: [] },
    {
      name: "clause_end_options$subexpression$1",
      symbols: [/[rR]/, /[eE]/, /[sS]/, /[tT]/, /[rR]/, /[iI]/, /[cC]/, /[tT]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_end_options",
      symbols: ["__", "clause_end_options$subexpression$1", "__"],
    },
    {
      name: "clause_end_options$subexpression$2",
      symbols: [/[cC]/, /[aA]/, /[sS]/, /[cC]/, /[aA]/, /[dD]/, /[eE]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "clause_end_options",
      symbols: ["clause_end_options$subexpression$2", "__"],
    },
  ],
  ParserStart: "statement",
};

export default grammar;
