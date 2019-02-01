"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("../../checkerResult");
class ColumnNotFound {
    constructor(columns) {
        this.message = "";
        this.columns = columns.map(result => result.Column);
    }
    check(query) {
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
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.ColumnNotFound = ColumnNotFound;
//# sourceMappingURL=columnNotFound.js.map