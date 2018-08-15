"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Use {
    tokenise(query) {
        query.lines.forEach(line => {
            line.content.split(' ').forEach(word => {
                const item = word.toLowerCase().trim();
                if (item === "use") {
                    line.tokens.push(["keyword", item]);
                }
                else {
                    line.tokens.push(["table_reference", item]);
                }
            });
        });
        return query;
    }
}
exports.Use = Use;
//# sourceMappingURL=use.js.map