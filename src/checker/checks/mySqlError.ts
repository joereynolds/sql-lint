import { Query } from "../../reader/query";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";

class MySqlError implements IChecker {
  public errors: any;
  public requiresConnection = true;

  // Note that we don't follow the interface correctly for MySQL Error
  // since the error message is dynamically generated.
  public message = "";

  public appliesTo = ["select", "create", "update", "drop", "insert"];
  public additionalInformation = "";

  constructor(errors: any) {
    this.errors = errors;
  }

  public check(query: Query): CheckerResult {
    if (this.appliesTo.includes(query.category)) {
      const lineNumber = query.lines[0].num;

      const message = this.concatErrorObject(this.errors);
      return new CheckerResult(lineNumber, message);
    }

    return new CheckerResult(0, "");
  }

  private concatErrorObject(error: any) {
    return `[${error.code}] ${error.sqlMessage}`;
  }
}

export { MySqlError };
