import { Query } from "../reader/reader";
import { CheckerResult } from "./checkerResult";


interface IChecker {
  check(query: Query): any;
}

export { IChecker };
