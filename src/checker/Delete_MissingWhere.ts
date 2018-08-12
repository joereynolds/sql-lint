import { Tokens } from "../lexer/tokens";
import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class MissingWhere implements IChecker {
  public check(query: Tokens): CheckerResult {
    if (!query.getContent().toLowerCase().includes("where")) {
      return new CheckerResult(0, "Delete missing WHERE, intentional?", "");
    }
    return new CheckerResult(0, "", "");
  }
}

export { MissingWhere };
