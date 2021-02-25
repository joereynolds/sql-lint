import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { Check } from "../../check";

class MissingWhere extends Check implements IChecker {
  public message: string = "DELETE statement missing WHERE clause.";
  public additionalInformation =
    "DELETE statements are highly destructive. You should specify a WHERE if you want to limit what the statement operates on.";
  public requiresConnection = false;
  public appliesTo = ["delete"];

  public check(query: Query): CheckerResult {
    this.getName();
    if (!query.getContent().toLowerCase().includes("where")) {
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

export { MissingWhere };
