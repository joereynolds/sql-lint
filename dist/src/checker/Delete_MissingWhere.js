"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("./checkerResult");
class MissingWhere {
    check(query) {
        if (!query.getContent().toLowerCase().includes("where")) {
            const lineNumber = query.lines[0].num;
            return new checkerResult_1.CheckerResult(lineNumber, "Delete missing WHERE, intentional?", "");
        }
        return new checkerResult_1.CheckerResult(0, "", "");
    }
}
exports.MissingWhere = MissingWhere;
//# sourceMappingURL=Delete_MissingWhere.js.map