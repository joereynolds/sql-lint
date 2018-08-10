"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generic_OddCodePoint_1 = require("../../src/checker/Generic_OddCodePoint");
test.each([
    ["SELECT 1", ""],
    ["SELECT name FROM person WHERE name ='Jane Doe'", ""],
    ["SELECT name FROM person WHERE name ='�'", "Bad code point"],
])("it finds bad codepoints in a query", (query, expected) => {
    const checker = new Generic_OddCodePoint_1.OddCodePoint();
    const actual = checker.check(query);
    expect(actual.content).toEqual(expected);
});
//# sourceMappingURL=lexer.test.js.map