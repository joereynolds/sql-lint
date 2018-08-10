"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("./checkerResult");
class OddCodePoint {
    check(query) {
        console.log('called');
        const badCodePoints = [65533];
        for (const char of query) {
            const codePoint = char.codePointAt(0);
            if (codePoint !== undefined) {
                if (badCodePoints.includes(codePoint)) {
                    return new checkerResult_1.CheckerResult(0, "Bad code point", "");
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "", "");
    }
}
exports.OddCodePoint = OddCodePoint;
//# sourceMappingURL=Generic_OddCodePoint.js.map