import { Query } from "../reader/reader";
import { Tokens } from "./tokens";

interface ILexer {
  tokenise(query: Query): Query;
}

export { ILexer };
