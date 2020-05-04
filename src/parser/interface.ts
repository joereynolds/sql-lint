import { Query } from "../reader/query";

interface IParser {
  options: string[];
  tokenise(query: Query): Query;
}

export { IParser };
