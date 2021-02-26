"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLimitQuantifier = void 0;
const checkerResult_1 = require("../../checkerResult");
const check_1 = require("../../check");
const sprintf_js_1 = require("sprintf-js");
const types_1 = require("../../../lexer/types");
class InvalidLimitQuantifier extends check_1.Check {
    constructor() {
        super(...arguments);
        this.message = "Argument '%s' is not a valid quantifier for LIMIT clause.";
        this.additionalInformation = "";
        this.requiresConnection = false;
        this.appliesTo = ["select", "update", "delete", "insert"];
    }
    check(query) {
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token.type === types_1.Types.RowCount && isNaN(Number(token.value))) {
                    return new checkerResult_1.CheckerResult(line.num, sprintf_js_1.sprintf(this.prefix + this.message, token.value));
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.InvalidLimitQuantifier = InvalidLimitQuantifier;
//# sourceMappingURL=invalidLimitQuantifier.js.map