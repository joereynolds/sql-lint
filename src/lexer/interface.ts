import { Query } from "../reader/reader";

interface ILexer {
  tokenise(query: Query): Query;
}

export { ILexer };
