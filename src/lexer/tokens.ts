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

export enum Keyword {
  Select = "select",
  Delete = "delete",
  Update = "update",
  From = "from",
  Where = "where",
  Set = "set",
  Join = "join",
  Having = "having",
  Limit = "limit",
  Else = "else",
  If = "if",
  Begin = "begin",
  Use = "use"
}
