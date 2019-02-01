"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableNotFound_1 = require("../../../src/checker/checks/generic/tableNotFound");
const lexer_1 = require("../../../src/lexer/lexer");
const reader_1 = require("../../../src/reader/reader");
test.each([
    [
        "SELECT * FROM symfony.dont_exist ;",
        { content: "Table 'dont_exist' does not exist in database 'symfony'.", line: 1 }
    ]
])("it finds tables that don't exist", (query, expected) => {
    const checker = new tableNotFound_1.TableNotFound([{ Table: "non_existent_table" }]);
    const queryObj = reader_1.putContentIntoLines(query);
    const tokenised = lexer_1.tokenise(queryObj[0]);
    const actual = checker.check(tokenised);
    expect(actual).toMatchObject(expected);
});
//# sourceMappingURL=TableNotFound.test.js.map