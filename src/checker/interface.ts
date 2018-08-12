import { Tokens } from "../lexer/tokens";
import { CheckerResult } from "./checkerResult";


interface IChecker {
  check(query: Tokens): CheckerResult;
}

export { IChecker };
