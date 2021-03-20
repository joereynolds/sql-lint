"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingWhere = void 0;
const checkerResult_1 = require("../../checkerResult");
const check_1 = require("../../check");
class MissingWhere extends check_1.Check {
    constructor() {
        super(...arguments);
        this.message = "DELETE statement missing WHERE clause.";
        this.additionalInformation = "DELETE statements are highly destructive. You should specify a WHERE if you want to limit what the statement operates on.";
        this.requiresConnection = false;
        this.appliesTo = ["delete"];
    }
    check(query) {
        this.getName();
        if (!query.getContent().toLowerCase().includes("where")) {
            const lineNumber = query.lines[0].num;
            return new checkerResult_1.CheckerResult(lineNumber, this.prefix + this.message, this.additionalInformation);
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.MissingWhere = MissingWhere;
//# sourceMappingURL=missingWhere.js.map