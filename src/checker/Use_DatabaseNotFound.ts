import { Database } from "../database";
import { Tokens } from "../lexer/tokens";
import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class DatabaseNotFound implements IChecker {
  public db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  public check(query: Tokens): CheckerResult {
      const tokenised = query.getTokenised();
      const tableReference = tokenised[1][1];

      if (!this.db.getDatabases(this.db.connection).includes(tableReference)) {
          return new CheckerResult(0, `Database '${tableReference}' does not exist.`, "");
      }
    return new CheckerResult(0, "", "");
  }
}

export { DatabaseNotFound };
