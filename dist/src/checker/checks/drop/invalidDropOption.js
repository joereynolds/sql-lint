"use strict";
/**
 * This error is triggered when a DROP statement
 * has an invalid option following the 'DROP'.
 *
 * It would trigger for this:
 *   DROP RUBBISH thing;
 * It wouldn't trigger for this:
 *   DROP TABLE test;
 */
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("../../checkerResult");
const tokens_1 = require("../../../lexer/tokens");
const sprintf_js_1 = require("sprintf-js");
const statements_1 = require("../../../barrel/statements");
class InvalidDropOption {
    constructor() {
        this.message = "Option '%s' is not a valid option, must be one of '%s'";
    }
    check(query) {
        const dropStatement = new statements_1.Drop();
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token[0] === tokens_1.Types.Option &&
                    !dropStatement.options.includes(token[1])) {
                    return new checkerResult_1.CheckerResult(line.num, sprintf_js_1.sprintf(this.message, token[1], JSON.stringify(dropStatement.options)));
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.InvalidDropOption = InvalidDropOption;
//# sourceMappingURL=invalidDropOption.js.map