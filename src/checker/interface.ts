import { Query } from "../reader/reader";

interface IChecker {
  message: string;
  check(query: Query): any;
}

export { IChecker };
