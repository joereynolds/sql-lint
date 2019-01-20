"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("../checkerResult");
class MissingWhere {
    constructor() {
        this.message = "DELETE missing WHERE, intentional?";
    }
    check(query) {
        if (!query.getContent().toLowerCase().includes("where")) {
            const lineNumber = query.lines[0].num;
            return new checkerResult_1.CheckerResult(lineNumber, this.message);
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.MissingWhere = MissingWhere;
//# sourceMappingURL=missingWhere.js.map