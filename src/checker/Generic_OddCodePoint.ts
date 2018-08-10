import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class OddCodePoint implements IChecker {
  public check(query: string): CheckerResult {
    console.log('called')
    const badCodePoints = [65533];

    for (const char of query) {
      const codePoint = char.codePointAt(0);

      if (codePoint !== undefined) {
        if (badCodePoints.includes(codePoint)) {
          return new CheckerResult(0, "Bad code point", "")
        }
      }
    }
    return new CheckerResult(0, "", "");
  }
}

export { OddCodePoint };
