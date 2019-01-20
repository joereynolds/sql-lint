"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("./checkerResult");
class OddCodePoint {
    check(query) {
        const badCodePoints = [65533];
        for (const char of query.getContent()) {
            const codePoint = char.codePointAt(0);
            if (codePoint !== undefined) {
                if (badCodePoints.includes(codePoint)) {
                    const lineNumber = query.lines[0].num;
                    return new checkerResult_1.CheckerResult(lineNumber, "Bad code point");
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.OddCodePoint = OddCodePoint;
//# sourceMappingURL=Generic_OddCodePoint.js.map