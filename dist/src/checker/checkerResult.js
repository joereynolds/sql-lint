"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Every 'checker' brings back a result of type CheckerResult.
 */
class CheckerResult {
    constructor(line, content, tokens) {
        this.line = line;
        this.content = content;
        this.tokens = tokens;
    }
}
exports.CheckerResult = CheckerResult;
//# sourceMappingURL=checkerResult.js.map