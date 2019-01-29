"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../../src/lexer/lexer");
test("The framework is running", () => {
    expect(1).toEqual(1);
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
    [" select * from person", "select"],
    // A create table statement
    ["CREATE TABLE person", "create"],
    ["USE symfony", "use"],
    ["use symfony;", "use"]
])("Queries are categorised correctly", (query, expected) => {
    const actual = lexer_1.categorise(query);
    expect(actual).toEqual(expected);
});
test.each([
    [
        "symfony.gigs.venue",
        {
            database: "symfony",
            table: "gigs",
            column: "venue"
        }
    ],
    [
        "gigs",
        {
            table: "gigs"
        }
    ],
    [
        "symfony.gigs",
        {
            database: "symfony",
            table: "gigs"
        }
    ]
])("Table references are correctly categorised", (tableReference, expected) => {
    const actual = lexer_1.extractTableReference(tableReference);
    expect(actual).toMatchObject(expected);
});
//# sourceMappingURL=main.test.js.map