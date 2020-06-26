"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerResult = void 0;
/**
 * Every 'checker' brings back a result of type CheckerResult.
 */
class CheckerResult {
    constructor(line, content, additionalInformation) {
        this.line = line;
        this.content = content;
        this.additionalInformation = additionalInformation !== null && additionalInformation !== void 0 ? additionalInformation : "";
    }
}
exports.CheckerResult = CheckerResult;
//# sourceMappingURL=checkerResult.js.map