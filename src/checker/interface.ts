import { Query } from "../reader/query";

interface IChecker {
  message: string;
  appliesTo: string[]
  check(query: Query): any;
}

export { IChecker };
