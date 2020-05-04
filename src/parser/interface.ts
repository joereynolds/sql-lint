import { Query } from "../reader/query";

interface IParser {
  options: string[];
  parse(query: Query): Query;
}

export { IParser };
