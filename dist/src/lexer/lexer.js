"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_1 = require("./select");
const use_1 = require("./use");
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
    if (query.startsWith("use")) {
        return "use";
    }
    throw new Error(`Unable to categorise query: ${query}`);
}
exports.categorise = categorise;
function tokenise(query) {
    const category = categorise(query.getContent());
    let tokeniser;
    switch (category) {
        case "select": {
            tokeniser = new select_1.Select();
        }
        case "use": {
            tokeniser = new use_1.Use();
        }
        default:
            tokeniser = new use_1.Use();
    }
    const tokens = tokeniser.tokenise(query);
    return tokens;
}
exports.tokenise = tokenise;
//# sourceMappingURL=lexer.js.map