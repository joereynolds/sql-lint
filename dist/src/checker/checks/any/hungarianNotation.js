"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HungarianNotation = void 0;
const checkerResult_1 = require("../../checkerResult");
const check_1 = require("../../check");
class HungarianNotation extends check_1.Check {
    constructor() {
        super(...arguments);
        this.message = "Hungarian notation present in query";
        this.additionalInformation = "";
        this.requiresConnection = false;
        this.appliesTo = [
            "select",
            "update",
            "create",
            "insert",
            "drop",
            "truncate",
            "alter",
        ];
    }
    check(query) {
        this.getName();
        if (query.getContent().toLowerCase().includes("sp_") ||
            query.getContent().toLowerCase().includes("tbl_")) {
            const lineNumber = query.lines[0].num;
            return new checkerResult_1.CheckerResult(lineNumber, this.prefix + this.message, this.additionalInformation);
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.HungarianNotation = HungarianNotation;
//# sourceMappingURL=hungarianNotation.js.map