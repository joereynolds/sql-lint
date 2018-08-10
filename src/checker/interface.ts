import { CheckerResult } from "./checkerResult";


interface IChecker {
  check(query: string[][]): CheckerResult;
}

export { IChecker };
