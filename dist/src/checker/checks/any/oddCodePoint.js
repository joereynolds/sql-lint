"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OddCodePoint = void 0;
const checkerResult_1 = require("../../checkerResult");
const check_1 = require("../../check");
class OddCodePoint extends check_1.Check {
    constructor() {
        super(...arguments);
        this.message = "Unexpected code point.";
        this.additionalInformation = "Certain programs will inject unexpected characters into your queries causing them to fail.";
        this.requiresConnection = false;
        this.appliesTo = ["select", "create", "update", "drop", "insert"];
    }
    check(query) {
        const badCodePoints = [65533];
        for (const char of query.getContent()) {
            const codePoint = char.codePointAt(0);
            if (codePoint !== undefined && badCodePoints.includes(codePoint)) {
                const lineNumber = query.lines[0].num;
                return new checkerResult_1.CheckerResult(lineNumber, this.prefix + this.message, this.additionalInformation);
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.OddCodePoint = OddCodePoint;
//# sourceMappingURL=oddCodePoint.js.map