"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckFactory = void 0;
const checks_1 = require("../barrel/checks");
class CheckFactory {
    build(check) {
        // any is actually IChecker
        const checkMap = {
            databaseNotFound: checks_1.DatabaseNotFound,
            invalidAlterOption: checks_1.InvalidAlterOption,
            invalidCreateOption: checks_1.InvalidCreateOption,
            invalidDropOption: checks_1.InvalidDropOption,
            invalidLimitQuantifier: checks_1.InvalidLimitQuantifier,
            invalidTruncateOption: checks_1.InvalidTruncateOption,
            missingWhere: checks_1.MissingWhere,
            mySqlError: checks_1.MySqlError,
            oddCodePoint: checks_1.OddCodePoint,
            unmatchedParentheses: checks_1.UnmatchedParentheses,
            hungarianNotation: checks_1.HungarianNotation
        };
        return new checkMap[check]();
    }
}
exports.CheckFactory = CheckFactory;
//# sourceMappingURL=checkFactory.js.map