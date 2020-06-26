// Generated automatically by nearley, version 2.19.2
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
    { name: "name", symbols: ["name$ebnf$1"] },
    { name: "name_list", symbols: ["name"] },
    {
      name: "name_list",
      symbols: ["name_list", "__", { literal: "," }, "name_list", "_"],
    },
    { name: "terminator", symbols: [{ literal: ";" }] },
    { name: "equals", symbols: [{ literal: "=" }] },
    { name: "yes", symbols: [{ literal: "Y" }] },
    { name: "no", symbols: [{ literal: "N" }] },
    { name: "yes_or_no", symbols: ["yes"] },
    { name: "yes_or_no", symbols: ["no"] },
    { name: "statement", symbols: ["create_statements", "_", "terminator"] },
    { name: "create_statements", symbols: ["create_database"] },
    {
      name: "create_view",
      symbols: [
        "keyword",
        "clause_or_replace",
        "clause_algorithm",
        "_",
        "clause_definer",
        "_",
        "clause_view",
      ],
    },
    {
      name: "create_index$string$1",
      symbols: [
        { literal: "I" },
        { literal: "N" },
        { literal: "D" },
        { literal: "E" },
        { literal: "X" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "create_index$ebnf$1", symbols: [/[A-z]/] },
    {
      name: "create_index$ebnf$1",
      symbols: ["create_index$ebnf$1", /[A-z]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "create_index",
      symbols: [
        "keyword",
        "clause_index",
        "_",
        "create_index$string$1",
        "_",
        "create_index$ebnf$1",
        "_",
        "clause_index_type",
      ],
    },
    {
      name: "create_database",
      symbols: [
        "keyword",
        "clause_database_or_schema",
        "clause_if_not_exists",
        "name",
        "__",
        "option_create_option",
      ],
    },
    {
      name: "keyword$subexpression$1",
      symbols: [/[cC]/, /[rR]/, /[eE]/, /[aA]/, /[tT]/, /[eE]/],
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
      name: "default$subexpression$1",
      symbols: [/[dD]/, /[eE]/, /[fF]/, /[aA]/, /[uU]/, /[lL]/, /[tT]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "default", symbols: ["default$subexpression$1", "__"] },
    {
      name: "character_set$subexpression$1",
      symbols: [
        /[cC]/,
        /[hH]/,
        /[aA]/,
        /[rR]/,
        /[aA]/,
        /[cC]/,
        /[tT]/,
        /[eE]/,
        /[rR]/,
      ],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "character_set$subexpression$2",
      symbols: [/[sS]/, /[eE]/, /[tT]/],
      postprocess(d) {
        return d.join("");
      },
    },
    {
      name: "character_set",
      symbols: [
        "character_set$subexpression$1",
        "__",
        "character_set$subexpression$2",
        "_",
      ],
    },
    {
      name: "collate$subexpression$1",
      symbols: [/[cC]/, /[oO]/, /[lL]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "collate", symbols: ["collate$subexpression$1", "__"] },
    {
      name: "encryption$subexpression$1",
      symbols: [
        /[eE]/,
        /[nN]/,
        /[cC]/,
        /[rR]/,
        /[yY]/,
        /[pP]/,
        /[tT]/,
        /[iI]/,
        /[oO]/,
        /[nN]/,
      ],
      postprocess(d) {
        return d.join("");
      },
    },
    { name: "encryption", symbols: ["encryption$subexpression$1", "__"] },
    { name: "character_set_choice$subexpression$1", symbols: [] },
    { name: "character_set_choice$subexpression$1", symbols: ["default"] },
    { name: "character_set_choice$subexpression$2", symbols: [] },
    { name: "character_set_choice$subexpression$2", symbols: ["equals"] },
    {
      name: "character_set_choice",
      symbols: [
        "character_set_choice$subexpression$1",
        "character_set",
        "character_set_choice$subexpression$2",
        "name",
      ],
    },
    { name: "collate_choice$subexpression$1", symbols: [] },
    { name: "collate_choice$subexpression$1", symbols: ["default"] },
    { name: "collate_choice$subexpression$2", symbols: [] },
    { name: "collate_choice$subexpression$2", symbols: ["equals"] },
    {
      name: "collate_choice",
      symbols: [
        "collate_choice$subexpression$1",
        "collate",
        "collate_choice$subexpression$2",
        "name",
      ],
    },
    { name: "encryption_choice$subexpression$1", symbols: [] },
    { name: "encryption_choice$subexpression$1", symbols: ["default"] },
    { name: "encryption_choice$subexpression$2", symbols: [] },
    { name: "encryption_choice$subexpression$2", symbols: ["equals"] },
    {
      name: "encryption_choice",
      symbols: [
        "encryption_choice$subexpression$1",
        "encryption",
        "encryption_choice$subexpression$2",
        "yes_or_no",
      ],
    },
    { name: "option_create_option", symbols: [] },
    {
      name: "option_create_option$subexpression$1",
      symbols: ["character_set_choice"],
    },
    {
      name: "option_create_option$subexpression$1",
      symbols: ["collate_choice"],
    },
    {
      name: "option_create_option$subexpression$1",
      symbols: ["encryption_choice"],
    },
    {
      name: "option_create_option",
      symbols: ["option_create_option$subexpression$1"],
    },
    {
      name: "clause_algorithm$string$1",
      symbols: [
        { literal: "U" },
        { literal: "N" },
        { literal: "D" },
        { literal: "E" },
        { literal: "F" },
        { literal: "I" },
        { literal: "N" },
        { literal: "E" },
        { literal: "D" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_algorithm", symbols: ["clause_algorithm$string$1"] },
    {
      name: "clause_algorithm$string$2",
      symbols: [
        { literal: "M" },
        { literal: "E" },
        { literal: "R" },
        { literal: "G" },
        { literal: "E" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_algorithm", symbols: ["clause_algorithm$string$2"] },
    {
      name: "clause_algorithm$string$3",
      symbols: [
        { literal: "T" },
        { literal: "E" },
        { literal: "M" },
        { literal: "P" },
        { literal: "T" },
        { literal: "A" },
        { literal: "B" },
        { literal: "L" },
        { literal: "E" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_algorithm", symbols: ["clause_algorithm$string$3"] },
    { name: "clause_algorithm", symbols: [] },
    {
      name: "clause_definer$string$1",
      symbols: [
        { literal: "u" },
        { literal: "s" },
        { literal: "e" },
        { literal: "r" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_definer", symbols: ["clause_definer$string$1"] },
    { name: "clause_definer", symbols: [] },
    {
      name: "clause_index$string$1",
      symbols: [
        { literal: "U" },
        { literal: "N" },
        { literal: "I" },
        { literal: "Q" },
        { literal: "U" },
        { literal: "E" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_index", symbols: ["clause_index$string$1"] },
    {
      name: "clause_index$string$2",
      symbols: [
        { literal: "F" },
        { literal: "U" },
        { literal: "L" },
        { literal: "L" },
        { literal: "T" },
        { literal: "E" },
        { literal: "X" },
        { literal: "T" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_index", symbols: ["clause_index$string$2"] },
    {
      name: "clause_index$string$3",
      symbols: [
        { literal: "S" },
        { literal: "P" },
        { literal: "A" },
        { literal: "T" },
        { literal: "I" },
        { literal: "A" },
        { literal: "L" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_index", symbols: ["clause_index$string$3"] },
    { name: "clause_index", symbols: [] },
    {
      name: "clause_index_type$string$1",
      symbols: [
        { literal: "U" },
        { literal: "S" },
        { literal: "I" },
        { literal: "N" },
        { literal: "G" },
        { literal: " " },
        { literal: "B" },
        { literal: "T" },
        { literal: "R" },
        { literal: "E" },
        { literal: "E" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_index_type", symbols: ["clause_index_type$string$1"] },
    {
      name: "clause_index_type$string$2",
      symbols: [
        { literal: "U" },
        { literal: "S" },
        { literal: "I" },
        { literal: "N" },
        { literal: "G" },
        { literal: " " },
        { literal: "H" },
        { literal: "A" },
        { literal: "S" },
        { literal: "H" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_index_type", symbols: ["clause_index_type$string$2"] },
    { name: "clause_index_type", symbols: [] },
    { name: "clause_or_replace", symbols: [] },
    {
      name: "clause_or_replace$string$1",
      symbols: [
        { literal: "O" },
        { literal: "R" },
        { literal: " " },
        { literal: "R" },
        { literal: "E" },
        { literal: "P" },
        { literal: "L" },
        { literal: "A" },
        { literal: "C" },
        { literal: "E" },
      ],
      postprocess: (d) => d.join(""),
    },
    {
      name: "clause_or_replace",
      symbols: ["clause_or_replace$string$1", "__"],
    },
    {
      name: "clause_view$string$1",
      symbols: [
        { literal: "V" },
        { literal: "I" },
        { literal: "E" },
        { literal: "W" },
      ],
      postprocess: (d) => d.join(""),
    },
    { name: "clause_view$ebnf$1", symbols: [/[A-z]/] },
    {
      name: "clause_view$ebnf$1",
      symbols: ["clause_view$ebnf$1", /[A-z]/],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    {
      name: "clause_view",
      symbols: ["clause_view$string$1", "clause_view$ebnf$1"],
    },
  ],
  ParserStart: "statement",
};

export default grammar;
