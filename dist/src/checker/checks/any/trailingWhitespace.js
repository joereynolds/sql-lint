"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrailingWhitespace = void 0;
const checkerResult_1 = require("../../checkerResult");
const sprintf_js_1 = require("sprintf-js");
const check_1 = require("../../check");
class TrailingWhitespace extends check_1.Check {
    constructor() {
        super(...arguments);
        this.message = "";
        this.additionalInformation = "";
        this.requiresConnection = false;
        this.appliesTo = [
            "select",
            "create",
            "delete",
            "update",
            "drop",
            "insert",
            "alter",
            "truncate",
        ];
    }
    check(query) {
        this.getName();
        for (const line of query.lines) {
            if (line.content.endsWith(" ")) {
                return new checkerResult_1.CheckerResult(line.num, sprintf_js_1.sprintf(this.prefix + "Trailing whitespace"));
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.TrailingWhitespace = TrailingWhitespace;
//# sourceMappingURL=trailingWhitespace.js.map