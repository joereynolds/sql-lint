import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { Check } from "../../check";

class HungarianNotation extends Check implements IChecker {
  public message: string = "Hungarian notation present in query";
  public additionalInformation = "";
  public requiresConnection = false;
  public appliesTo = [
    "select",
    "update",
    "create",
    "insert",
    "drop",
    "truncate",
    "alter",
  ];

  public check(query: Query): CheckerResult {
    this.getName();
    if (
      query.getContent().toLowerCase().includes("sp_") ||
      query.getContent().toLowerCase().includes("tbl_")
    ) {
      const lineNumber = query.lines[0].num;
      return new CheckerResult(
        lineNumber,
        this.prefix + this.message,
        this.additionalInformation
      );
    }
    return new CheckerResult(0, "");
  }
}

export { HungarianNotation };
