"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseNotFound = void 0;
const checkerResult_1 = require("../../checkerResult");
const types_1 = require("../../../lexer/types");
const sprintf_js_1 = require("sprintf-js");
const check_1 = require("../../check");
class DatabaseNotFound extends check_1.Check {
    constructor(databases) {
        super();
        this.message = "Database '%s' does not exist.";
        this.additionalInformation = "";
        this.requiresConnection = true;
        this.appliesTo = ["select", "create", "update", "drop", "insert"];
        this.databases = databases.map((result) => result.Database);
    }
    check(query) {
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token.type === types_1.Types.TableReference) {
                    const database = token.value;
                    if (!this.databases.includes(database) && database !== ";") {
                        return new checkerResult_1.CheckerResult(line.num, sprintf_js_1.sprintf(this.prefix + this.message, database));
                    }
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.DatabaseNotFound = DatabaseNotFound;
//# sourceMappingURL=databaseNotFound.js.map