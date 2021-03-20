import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { Check } from "../../check";

class UnmatchedParentheses extends Check implements IChecker {
  public message = "Unmatched parentheses.";
  public requiresConnection = false;
  public additionalInformation = "";
  public appliesTo = ["select", "create", "update", "drop", "insert"];
  public check(query: Query): CheckerResult {
    const content = query.getContent();

    const openParenMatches = (content.match(/\(/g) || []).length;
    const closedParenMatches = (content.match(/\)/g) || []).length;

    if (openParenMatches !== closedParenMatches) {
      const lineNumber = query.lines[0].num;
      return new CheckerResult(lineNumber, this.prefix + this.message);
    }
    return new CheckerResult(0, "");
  }
}

export { UnmatchedParentheses };
