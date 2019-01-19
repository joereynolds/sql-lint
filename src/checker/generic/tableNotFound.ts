import { extractTableReference } from "../../lexer/lexer";
import { Query } from "../../reader/reader";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";
import { Types } from "../../lexer/tokens";

class TableNotFound implements IChecker {
  public tables: string[];
  constructor(tables: any[]) {
    this.tables = this.cleanTables(tables);
  }

  public check(query: Query): CheckerResult {
    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (token[0] === Types.TableReference) {
          const reference = extractTableReference(token[1]);

          if (
            !this.tables.includes(reference.table) &&
            reference.table !== "*"
          ) {
            return new CheckerResult(
              line.num,
              `Table '${reference.table}' does not exist in database '${
                reference.database
              }'.`
            );
          }
        }
      }
    }

    return new CheckerResult(0, "");
  }

  private cleanTables(tables: any): string[] {
    const cleanTables: string[] = [];
    for (const obj of tables) {
      const cleanTable = (<any>Object).values(obj)[0];
      if (cleanTable.length > 0) {
        cleanTables.push(cleanTable);
      }
    }
    return cleanTables;
  }
}

export { TableNotFound };
