"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../../src/lexer/lexer");
const select_1 = require("../../src/lexer/select");
const tokens_1 = require("../../src/lexer/tokens");
test("The framework is running", () => {
    expect(1).toEqual(1);
});
test("Tokens are populated with a query on instantiation", () => {
    const actual = new tokens_1.Tokens("SELECT * FROM test");
    const expected = "SELECT * FROM test";
    expect(actual.content).toEqual(expected);
});
test("Tokens can retrieve their content", () => {
    //
});
test("Tokens can retrieve their tokens", () => {
    //
});
test("Tokens can retrieve their tokenised content", () => {
    //
});
test.each([
    // SELECT statements
    ["SELECT * FROM person", "select"],
    // DELETE statements
    ["DELETE FROM person WHERE name = 'John.Doe'", "delete"],
    // UPDATE statements
    ["UPDATE person SET name = 'Joe.Reynolds'", "update"],
    // A statement with a trailing space
    ["   SELECT    * FROM person", "select"],
    // A statement with a lowercase keyword
    [" select * from person", "select"]
])("Queries are categorised correctly", (query, expected) => {
    const actual = lexer_1.categorise(query);
    expect(actual).toEqual(expected);
});
test.each([
    [
        "SELECT * FROM person",
        [
            ["keyword", "select"],
            ["table_reference", "*"],
            ["keyword", "from"],
            ["table_reference", "person"]
        ]
    ],
    [
        "SELECT last_name FROM person",
        [
            ["keyword", "select"],
            ["table_reference", "last_name"],
            ["keyword", "from"],
            ["table_reference", "person"]
        ]
    ],
    [
        "SELECT * FROM person WHERE name = 'test'",
        [
            ["keyword", "select"],
            ["table_reference", "*"],
            ["keyword", "from"],
            ["table_reference", "person"],
            ["keyword", "where"],
            ["???", "name"],
            ["???", "="],
            ["???", "'test'"]
        ]
    ]
])("It tokenises a select correctly", (query, expected) => {
    const tokeniser = new select_1.Select();
    const actual = tokeniser.tokenise(query);
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=main.test.js.map