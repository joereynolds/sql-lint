"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("../../checkerResult");
class SqlError {
    constructor(errors) {
        this.requiresConnection = true;
        // Note that we don't follow the interface correctly for RDBMS Errors
        // since the error message is dynamically generated.
        this.message = "";
        this.appliesTo = ["select", "create", "update", "drop", "insert"];
        this.additionalInformation = "";
        this.errors = errors;
    }
    check(query) {
        if (this.appliesTo.includes(query.category)) {
            const lineNumber = query.lines[0].num;
            const message = this.concatErrorObject(this.errors);
            return new checkerResult_1.CheckerResult(lineNumber, message);
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
    concatErrorObject(error) {
        return `[${error.code}] ${error.sqlMessage}`;
    }
}
exports.default = SqlError;
//# sourceMappingURL=sqlError.js.map