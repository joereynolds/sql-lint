"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckFactory = void 0;
const checks_1 = require("../barrel/checks");
class CheckFactory {
    build(check) {
        // any is actually IChecker
        const checkMap = {
            databaseNotFound: checks_1.DatabaseNotFound,
            hungarianNotation: checks_1.HungarianNotation,
            invalidLimitQuantifier: checks_1.InvalidLimitQuantifier,
            missingWhere: checks_1.MissingWhere,
            oddCodePoint: checks_1.OddCodePoint,
            trailingWhitespace: checks_1.TrailingWhitespace,
            unmatchedParentheses: checks_1.UnmatchedParentheses,
            mySqlError: checks_1.MySqlError,
            mySqlInvalidAlterOption: checks_1.MySqlInvalidAlterOption,
            mySqlInvalidCreateOption: checks_1.MySqlInvalidCreateOption,
            mySqlInvalidDropOption: checks_1.MySqlInvalidDropOption,
            mySqlInvalidTruncateOption: checks_1.MySqlInvalidTruncateOption,
            postgresError: checks_1.PostgresError,
            postgresInvalidAlterOption: checks_1.PostgresInvalidAlterOption,
            postgresInvalidCreateOption: checks_1.PostgresInvalidCreateOption,
            postgresInvalidDropOption: checks_1.PostgresInvalidDropOption,
            postgresInvalidTruncateOption: checks_1.PostgresInvalidTruncateOption,
        };
        return new checkMap[check]();
    }
}
exports.CheckFactory = CheckFactory;
//# sourceMappingURL=checkFactory.js.map