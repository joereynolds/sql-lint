"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("./checkerResult");
class NullChecker {
    constructor() {
        this.message = "";
    }
    check(query) {
        return new checkerResult_1.CheckerResult(0, this.message);
    }
}
exports.NullChecker = NullChecker;
//# sourceMappingURL=nullChecker.js.map