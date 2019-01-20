import { Query } from "../../reader/reader";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";

class MissingWhere implements IChecker {

  public message = "DELETE missing WHERE, intentional?";

  public check(query: Query): CheckerResult {
    if (!query.getContent().toLowerCase().includes("where")) {
      const lineNumber = query.lines[0].num;
      return new CheckerResult(lineNumber, this.message);
    }
    return new CheckerResult(0, "");
  }
}

export { MissingWhere };
