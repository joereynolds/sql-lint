import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";

export default class SqlError implements IChecker {
  public errors: any;
  public requiresConnection = true;

  // Note that we don't follow the interface correctly for RDBMS Errors
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

  public getName(): string {
      return '';
  }

  private concatErrorObject(error: any) {
    return `[${error.code}] ${error.sqlMessage}`;
  }
}
