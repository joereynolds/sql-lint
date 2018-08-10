"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function categorise(query) {
    query = query.trim().toLowerCase();
    if (query.startsWith("select")) {
        return "select";
    }
    if (query.startsWith("delete")) {
        return "delete";
    }
    if (query.startsWith("update")) {
        return "update";
    }
    throw new Error(`Unable to categorise query: ${query}`);
}
exports.categorise = categorise;
//# sourceMappingURL=lexer.js.map