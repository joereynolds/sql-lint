"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
class Select {
    tokenise(query) {
        const splitQuery = query.split(" ");
        const tokenised = [];
        let lastToken = "";
        splitQuery.forEach((item) => {
            item = item.toLowerCase();
            if (tokens_1.TOKENS.keyword.includes(item)) {
                tokenised.push(["keyword", item]);
            }
            if (lastToken === "select" || lastToken === "from") {
                tokenised.push(["table_reference", item]);
            }
            lastToken = item;
        });
        return tokenised;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map