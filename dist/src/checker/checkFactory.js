"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../barrel/checks");
class CheckFactory {
    build(check) {
        // any is actually IChecker
        const checkMap = {
            "missingWhere": checks_1.MissingWhere,
            "mySqlError": checks_1.MySqlError,
            "invalidAlterOption": checks_1.InvalidAlterOption,
            "invalidDropOption": checks_1.InvalidDropOption,
            // "invalidOption": InvalidOption,
            "invalidCreateOption": checks_1.InvalidCreateOption,
            "invalidTruncateOption": checks_1.InvalidTruncateOption,
            "oddCodePoint": checks_1.OddCodePoint,
            "tableNotFound": checks_1.TableNotFound,
            "unmatchedParentheses": checks_1.UnmatchedParentheses,
        };
        return new checkMap[check]();
    }
}
exports.CheckFactory = CheckFactory;
//# sourceMappingURL=checkFactory.js.map