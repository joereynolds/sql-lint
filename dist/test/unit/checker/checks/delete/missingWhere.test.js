"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingWhere_1 = require("../../../../../src/checker/checks/delete/missingWhere");
const lexer_1 = require("../../../../../src/lexer/lexer");
const reader_1 = require("../../../../../src/reader/reader");
test.each([
    ["DELETE FROM person WHERE name = 'Jon';", ""],
    ["DELETE FROM person;", "DELETE missing WHERE, intentional?"]
])("it finds missing WHEREs in DELETEs", (query, expected) => {
    const checker = new missingWhere_1.MissingWhere();
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual.content).toEqual(expected);
});
//# sourceMappingURL=missingWhere.test.js.map