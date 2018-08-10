import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class OddCodePoint implements IChecker {
  public check(query: string[][]): CheckerResult {
    const badCodePoints = [65533];

    for (const token of query) {
    for (const char of token) {
      const codePoint = char.codePointAt(0);

      if (codePoint !== undefined) {
        if (badCodePoints.includes(codePoint)) {
          return new CheckerResult(0, "Bad code point", "")
        }
      }
    }
    }
    return new CheckerResult(0, "", "");
  }
}

export { OddCodePoint };
