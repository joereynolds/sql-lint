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
  Begin = "begin",
  Create = "create",
  Delete = "delete",
  Else = "else",
  From = "from",
  Having = "having",
  If = "if",
  Join = "join",
  Limit = "limit",
  Select = "select",
  Set = "set",
  Update = "update",
  Use = "use",
  Where = "where"
}
