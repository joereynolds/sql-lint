"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oddCodePoint_1 = require("../../../src/checker/generic/oddCodePoint");
const lexer_1 = require("../../../src/lexer/lexer");
const reader_1 = require("../../../src/reader/reader");
test.each([
    ["SELECT 1;", ""],
    ["SELECT name FROM person WHERE name ='Jane Doe';", ""],
    ["SELECT name FROM person WHERE name ='�';", "Bad code point"]
])("it finds bad codepoints in a query", (query, expected) => {
    const checker = new oddCodePoint_1.OddCodePoint();
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual.content).toEqual(expected);
});
//# sourceMappingURL=OddCodePoint.test.js.map