import { Database } from "../database";
import { Tokens } from "../lexer/tokens";
import { Query } from "../reader/reader";
import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class DatabaseNotFound implements IChecker {
  public databases: string[];
  constructor(databases: any[]) {
    this.databases = databases.map(result => result.Database);
  }
  public check(query: Query): CheckerResult {

    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (token[0] === "table_reference") {
          const database = token[1];
          if (!this.databases.includes(database) && database !== ';') {
            return new CheckerResult(
              line.num,
              `Database '${database}' does not exist.`,
            );
          }
        }
      }
    }

    return new CheckerResult(0, "");
  }
}

export { DatabaseNotFound };
