import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { sprintf } from "sprintf-js";
import { Check } from "../../check";

class TrailingWhitespace extends Check implements IChecker {
  public message: string = "";
  public additionalInformation = "";
  public requiresConnection = false;
  public appliesTo = [
    "select",
    "create",
    "delete",
    "update",
    "drop",
    "insert",
    "alter",
    "truncate",
  ];

  public check(query: Query): CheckerResult {
    this.getName();
    for (const line of query.lines) {
      if (line.content.endsWith(" ")) {
        return new CheckerResult(
          line.num,
          sprintf(this.prefix + "Trailing whitespace")
        );
      }
    }

    return new CheckerResult(0, "");
  }
}

export { TrailingWhitespace };
