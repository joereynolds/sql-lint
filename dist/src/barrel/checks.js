"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../checker/checks/alter/invalidAlterOption"));
__export(require("../checker/checks/create/invalidCreateOption"));
__export(require("../checker/checks/delete/missingWhere"));
__export(require("../checker/checks/drop/invalidDropOption"));
__export(require("../checker/checks/generic/mySqlError"));
__export(require("../checker/checks/generic/oddCodePoint"));
__export(require("../checker/checks/generic/tableNotFound"));
__export(require("../checker/checks/generic/unmatchedParentheses"));
__export(require("../checker/checks/truncate/invalidTruncateOption"));
__export(require("../checker/checks/use/databaseNotFound"));
//# sourceMappingURL=checks.js.map