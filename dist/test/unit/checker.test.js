"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Delete_MissingWhere_1 = require("../../src/checker/Delete_MissingWhere");
const Generic_OddCodePoint_1 = require("../../src/checker/Generic_OddCodePoint");
const Use_DatabaseNotFound_1 = require("../../src/checker/Use_DatabaseNotFound");
const lexer_1 = require("../../src/lexer/lexer");
const reader_1 = require("../../src/reader/reader");
test.each([
    ["SELECT 1;", ""],
    ["SELECT name FROM person WHERE name ='Jane Doe';", ""],
    ["SELECT name FROM person WHERE name ='�';", "Bad code point"]
])("it finds bad codepoints in a query", (query, expected) => {
    const checker = new Generic_OddCodePoint_1.OddCodePoint();
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual.content).toEqual(expected);
});
test.each([
    ["DELETE FROM person WHERE name = 'Jon';", ""],
    ["DELETE FROM person;", "Delete missing WHERE, intentional?"]
])("it finds missing WHEREs in DELETEs", (query, expected) => {
    const checker = new Delete_MissingWhere_1.MissingWhere();
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual.content).toEqual(expected);
});
test.each([
    ["USE non_existent_db ;", { "content": "Database 'non_existent_db' does not exist.", "line": 1, "tokens": "" }],
    ["USE existing_db ;", { "content": "", "line": 0, "tokens": "" }]
])("it finds databases that don't exist", (query, expected) => {
    const checker = new Use_DatabaseNotFound_1.DatabaseNotFound([{ Database: "existing_db" }]);
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual).toMatchObject(expected);
});
//# sourceMappingURL=checker.test.js.map