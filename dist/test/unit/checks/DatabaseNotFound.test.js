"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseNotFound_1 = require("../../../src/checker/use/databaseNotFound");
const lexer_1 = require("../../../src/lexer/lexer");
const reader_1 = require("../../../src/reader/reader");
test.each([
    [
        "USE non_existent_db ;",
        { content: "Database 'non_existent_db' does not exist.", line: 1 }
    ],
    [
        "USE other_db;",
        { content: "Database 'other_db' does not exist.", line: 1 }
    ],
    ["USE existing_db ;", { content: "", line: 0 }],
    ["USE existing_db;", { content: "", line: 0 }]
])("it finds databases that don't exist", (query, expected) => {
    const checker = new databaseNotFound_1.DatabaseNotFound([{ Database: "existing_db" }]);
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual).toMatchObject(expected);
});
//# sourceMappingURL=DatabaseNotFound.test.js.map