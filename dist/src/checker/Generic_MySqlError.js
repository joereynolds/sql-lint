"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("./checkerResult");
class MySqlError {
    constructor(errors) {
        this.errors = errors;
    }
    check(query) {
        const allowedCategories = [
            'select',
            'insert',
            'replace',
            'update',
        ];
        if (allowedCategories.includes(query.category)) {
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
exports.MySqlError = MySqlError;
//# sourceMappingURL=Generic_MySqlError.js.map