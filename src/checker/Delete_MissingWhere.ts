import { Query } from "../reader/reader";
import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class MissingWhere implements IChecker {
  public check(query: Query): CheckerResult {
    if (!query.getContent().toLowerCase().includes("where")) {
      const lineNumber = query.lines[0].num;
      return new CheckerResult(lineNumber, "Delete missing WHERE, intentional?", "");
    }
    return new CheckerResult(0, "", "");
  }
}

export { MissingWhere };
