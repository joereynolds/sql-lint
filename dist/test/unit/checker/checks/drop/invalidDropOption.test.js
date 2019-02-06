"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalidDropOption_1 = require("../../../../../src/checker/checks/drop/invalidDropOption");
const lexer_1 = require("../../../../../src/lexer/lexer");
const reader_1 = require("../../../../../src/reader/reader");
test.each([
    ["DROP TABLE person;", ""],
    ["DROP JIBBERISH person;", /Option 'jibberish' is not a valid option, must be one of .*/]
])("it warns about invalid options in DROPs", (query, expected) => {
    const checker = new invalidDropOption_1.InvalidDropOption();
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual.content).toMatch(expected);
});
//# sourceMappingURL=invalidDropOption.test.js.map