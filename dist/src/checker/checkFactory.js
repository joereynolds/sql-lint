"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../barrel/checks");
class CheckFactory {
    build(check) {
        // any is actually IChecker
        const checkMap = {
            missingWhere: checks_1.MissingWhere,
            mySqlError: checks_1.MySqlError,
            invalidAlterOption: checks_1.InvalidAlterOption,
            invalidDropOption: checks_1.InvalidDropOption,
            invalidCreateOption: checks_1.InvalidCreateOption,
            invalidTruncateOption: checks_1.InvalidTruncateOption,
            oddCodePoint: checks_1.OddCodePoint,
            unmatchedParentheses: checks_1.UnmatchedParentheses,
            databaseNotFound: checks_1.DatabaseNotFound
        };
        return new checkMap[check]();
    }
}
exports.CheckFactory = CheckFactory;
//# sourceMappingURL=checkFactory.js.map