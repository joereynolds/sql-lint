export const TOKENS = {
  keyword: [
    "select",
    "delete",
    "update",
    "from",
    "where",
    "set",
    "join",
    "having",
    "limit",
    "else",
    "if",
    "begin"
  ],

  comment: ["#", "--"],
  boolean: ["true", "false", "null"],
  conditional: ["and", "or"],
  operator: ["+", "-", "/"]
};

export enum Types {
  Keyword = "keyword",
  TableReference = "table_reference",
  Option = "option",
  Unidentified = "???"
}

export enum Keyword {
  Alter = "alter",
  Begin = "begin",
  Call = "call",
  Create = "create",
  Declare = "declare",
  Delete = "delete",
  Drop = "drop",
  Else = "else",
  From = "from",
  Having = "having",
  If = "if",
  Insert = "insert",
  Join = "join",
  Leave = "leave",
  Limit = "limit",
  Replace = "replace",
  Return = "return",
  Select = "select",
  Set = "set",
  Show = "show",
  Truncate = "truncate",
  Update = "update",
  Use = "use",
  Where = "where"
}
