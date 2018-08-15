"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
class Select {
    tokenise(query) {
        const splitQuery = query.getContent().split(" ");
        const tokens = new tokens_1.Tokens(query.getContent());
        let lastToken = "";
        query.lines.forEach(line => {
            line.content.split(" ").forEach(word => {
                const item = word.toLowerCase();
                if (tokens_1.TOKENS.keyword.includes(item)) {
                    line.tokens.push(["keyword", item]);
                }
                else if (lastToken === "select" || lastToken === "from") {
                    line.tokens.push(["table_reference", item]);
                }
                else {
                    line.tokens.push(["???", item]);
                }
                lastToken = item;
            });
        });
        return query;
    }
    /*
       * TODO - Move this into an abstract class and extend that
       *
       * extractTableReference('symfony.gigs') => [
       *     'database': 'symfony',
       *     'table': 'gigs'
       * ]
       *
       * extractTableReference('symfony.gigs.venue') => [
       *     'database': 'symfony',
       *     'table': 'gigs',
       *     'column': 'venue'
       * ]
       *
       * extractTableReference('gigs.venue') => [
       *     'table': 'gigs',
       *     'column': 'venue'
       * ]
       *
       * extractTableReference('venue') => [
       *     'column': 'venue'
       * ]
       *
       * Assumptions:
       *   - A value on its own e.g. "venue" is assumed to be a table.
       *   - 3 values e.g. "symfony.gigs.venue" is assumed to be database.table.column
       *   - 2 values is assumed to be database.table
       */
    extractTableReference(tableReference) {
        const references = tableReference.split(".");
        const extractedReferences = {
            3: {
                database: references[0],
                table: references[1],
                column: references[2]
            },
            2: {
                database: references[0],
                table: references[1]
            },
            1: {
                table: references[0]
            }
        };
        return extractedReferences[references.length];
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map