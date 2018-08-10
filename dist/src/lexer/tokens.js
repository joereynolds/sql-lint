"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOKENS = {
    "keyword": [
        "select",
        "delete",
        "update",
        "from",
        "where",
        "set",
        "join",
        "having",
        "limit",
        "else",
        "if",
        "begin",
    ],
    "comment": ["#", "--"],
    "boolean": ["true", "false", "null"],
    "conditional": ["and", "or"],
    "operator": ["+", "-", "/"],
};
exports.TOKENS = TOKENS;
//# sourceMappingURL=tokens.js.map