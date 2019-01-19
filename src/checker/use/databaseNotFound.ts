import { Query } from "../../reader/reader";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";
import { Types } from "../../lexer/tokens";

class DatabaseNotFound implements IChecker {
  public databases: string[];
  constructor(databases: any[]) {
    this.databases = databases.map(result => result.Database);
  }
  public check(query: Query): CheckerResult {

    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (token[0] === Types.TableReference) {
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
