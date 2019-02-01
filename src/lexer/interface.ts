import { Query } from "../reader/query";

interface ILexer {
  tokenise(query: Query): Query;
}

export { ILexer };
