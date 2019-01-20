"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerResult_1 = require("./checkerResult");
const tokens_1 = require("../lexer/tokens");
class DatabaseNotFound {
    constructor(databases) {
        this.databases = databases.map(result => result.Database);
    }
    check(query) {
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token[0] === tokens_1.Types.TableReference) {
                    const database = token[1];
                    if (!this.databases.includes(database) && database !== ';') {
                        return new checkerResult_1.CheckerResult(line.num, `Database '${database}' does not exist.`);
                    }
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
}
exports.DatabaseNotFound = DatabaseNotFound;
//# sourceMappingURL=Use_DatabaseNotFound.js.map