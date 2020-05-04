import { Query } from "../reader/query";

interface ILexer {
  options: string[];
  tokenise(query: Query): Query;
}

export { ILexer };
