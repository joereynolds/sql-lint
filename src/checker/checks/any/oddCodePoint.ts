import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { Check } from "../../check";

class OddCodePoint extends Check implements IChecker {
  public message = "Unexpected code point.";
  public additionalInformation =
    "Certain programs will inject unexpected characters into your queries causing them to fail.";
  public requiresConnection = false;
  public appliesTo = ["select", "create", "update", "drop", "insert"];
  public check(query: Query): CheckerResult {
    const badCodePoints = [65533];

    for (const char of query.getContent()) {
      const codePoint = char.codePointAt(0);

      if (codePoint !== undefined && badCodePoints.includes(codePoint)) {
        const lineNumber = query.lines[0].num;
        return new CheckerResult(
          lineNumber,
          this.prefix + this.message,
          this.additionalInformation
        );
      }
    }
    return new CheckerResult(0, "");
  }
}

export { OddCodePoint };
