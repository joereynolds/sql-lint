"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySqlError_1 = require("../../../../../src/checker/checks/generic/mySqlError");
const lexer_1 = require("../../../../..//src/lexer/lexer");
const reader_1 = require("../../../../../src/reader/reader");
test("It brings back the error from the server", () => {
    const query = "SELECT stuff FROM things ;";
    const checker = new mySqlError_1.MySqlError({ "code": "test code", "sqlMessage": "You have an error." });
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const expected = { "content": "[test code] You have an error.", "line": 1 };
    const actual = checker.check(tokenised);
    expect(actual).toEqual(expected);
});
test("It only lints select, delete, insert, replace, and update", () => {
    const query = "USE test ;";
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const checker = new mySqlError_1.MySqlError({});
    const actual = checker.check(tokenised);
    const expected = { "content": "", "line": 0 };
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=mySqlError.test.js.map