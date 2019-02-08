"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("../../checkerResult");
const tokens_1 = require("../../../lexer/tokens");
const sprintf_js_1 = require("sprintf-js");
class DatabaseNotFound {
    constructor(databases) {
        this.message = "Database '%s' does not exist.";
        this.databases = databases.map(result => result.Database);
    }
    check(query) {
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token[0] === tokens_1.Types.TableReference) {
                    const database = token[1];
                    if (!this.databases.includes(database) && database !== ";") {
                        return new checkerResult_1.CheckerResult(line.num, sprintf_js_1.sprintf(this.message, database));
                    }
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.DatabaseNotFound = DatabaseNotFound;
//# sourceMappingURL=databaseNotFound.js.map