import { Query } from "../reader/query";

interface IChecker {
  message: string;
  check(query: Query): any;
}

export { IChecker };
