"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("../lexer/statements/mysql/alter"), exports);
__exportStar(require("../lexer/statements/mysql/create"), exports);
__exportStar(require("../lexer/statements/mysql/drop"), exports);
__exportStar(require("../lexer/statements/mysql/select"), exports);
__exportStar(require("../lexer/statements/mysql/truncate"), exports);
__exportStar(require("../lexer/statements/mysql/use"), exports);
__exportStar(require("../lexer/statements/postgres/create"), exports);
__exportStar(require("../lexer/statements/postgres/drop"), exports);
__exportStar(require("../lexer/statements/postgres/select"), exports);
__exportStar(require("../lexer/statements/postgres/truncate"), exports);
__exportStar(require("../lexer/statements/postgres/use"), exports);
//# sourceMappingURL=statements.js.map