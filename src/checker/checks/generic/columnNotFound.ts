import { Query } from "../../../reader/reader";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";

class ColumnNotFound implements IChecker {

  public message = "";
  public columns: string[];
  constructor(columns: any[]) {
    this.columns = columns.map(result => result.Column);
  }
  public check(query: Query): CheckerResult {

//     for (const line of query.lines) {
//       for (const token of line.tokens) {
//         if (token[0] === "table_reference") {
//           const database = token[1];
//           if (!this.columns.includes(database) && database !== ';') {
//             return new CheckerResult(
//               line.num,
//               `Database '${database}' does not exist.`,
//             );
//           }
//         }
//       }
//     }

    return new CheckerResult(0, "");
  }
}

export { ColumnNotFound };
