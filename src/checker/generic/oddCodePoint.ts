import { Query } from "../../reader/reader";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";

class OddCodePoint implements IChecker {

  public message = "Bad code point";
  public check(query: Query): CheckerResult {

    const badCodePoints = [65533];

    for (const char of query.getContent()) {
      const codePoint = char.codePointAt(0);

      if (codePoint !== undefined) {
        if (badCodePoints.includes(codePoint)) {
          const lineNumber = query.lines[0].num;
          return new CheckerResult(lineNumber, this.message)
        }
      }
    }
    return new CheckerResult(0, "");
  }
}

export { OddCodePoint };
