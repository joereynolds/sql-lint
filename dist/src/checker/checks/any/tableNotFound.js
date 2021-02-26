"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableNotFound = void 0;
const lexer_1 = require("../../../lexer/lexer");
const checkerResult_1 = require("../../checkerResult");
const types_1 = require("../../../lexer/types");
const sprintf_js_1 = require("sprintf-js");
class TableNotFound {
    constructor(tables) {
        this.message = "Table '%s' does not exist in database '%s'.";
        this.additionalInformation = "";
        this.appliesTo = ["select", "create", "update", "drop", "insert"];
        this.requiresConnection = false;
        this.tables = this.cleanTables(tables);
    }
    check(query) {
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token.type === types_1.Types.TableReference) {
                    const reference = lexer_1.extractTableReference(token.value);
                    if (!this.tables.includes(reference.table) &&
                        reference.table !== "*") {
                        return new checkerResult_1.CheckerResult(line.num, sprintf_js_1.sprintf(this.message, reference.table, reference.database));
                    }
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
    cleanTables(tables) {
        const cleanTables = [];
        for (const obj of tables) {
            const cleanTable = Object.values(obj)[0];
            if (cleanTable.length > 0) {
                cleanTables.push(cleanTable);
            }
        }
        return cleanTables;
    }
}
exports.TableNotFound = TableNotFound;
//# sourceMappingURL=tableNotFound.js.map