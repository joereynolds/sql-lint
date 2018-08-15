"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../../src/lexer/lexer");
const select_1 = require("../../src/lexer/select");
const tokens_1 = require("../../src/lexer/tokens");
const use_1 = require("../../src/lexer/use");
const reader_1 = require("../../src/reader/reader");
test("The framework is running", () => {
    expect(1).toEqual(1);
});
test("Tokens are populated with a query on instantiation", () => {
    const actual = new tokens_1.Tokens("SELECT * FROM test");
    const expected = "SELECT * FROM test";
    expect(actual.content).toEqual(expected);
});
test("Tokens can retrieve their content", () => {
    const t = new tokens_1.Tokens("SELECT * FROM test");
    const actual = t.getContent();
    const expected = "SELECT * FROM test";
    expect(actual).toEqual(expected);
});
test("Tokens can add a token", () => {
    const t = new tokens_1.Tokens("");
    t.addToken("keyword");
    const actual = t.getTokens();
    const expected = ["keyword"];
    expect(actual).toEqual(expected);
});
test("Tokens can retrieve their tokenised content", () => {
    const t = new tokens_1.Tokens("SELECT * FROM test");
    t.addTokenised(["keyword", "select"]);
    t.addTokenised(["table_reference", "*"]);
    t.addTokenised(["keyword", "from"]);
    t.addTokenised(["table_reference", "test"]);
    const actual = t.getTokenised();
    const expected = [
        ["keyword", "select"],
        ["table_reference", "*"],
        ["keyword", "from"],
        ["table_reference", "test"]
    ];
    expect(actual).toEqual(expected);
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
    ["USE symfony", "use"],
    ["use symfony;", "use"]
])("Queries are categorised correctly", (query, expected) => {
    const actual = lexer_1.categorise(query);
    expect(actual).toEqual(expected);
});
test.each([
    [
        "SELECT * FROM person;",
        {
            lines: [
                {
                    content: "SELECT * FROM person;",
                    num: 1,
                    tokens: [
                        ["keyword", "select"],
                        ["table_reference", "*"],
                        ["keyword", "from"],
                        ["table_reference", "person;"]
                    ]
                }
            ]
        }
    ],
    [
        "SELECT last_name FROM person;",
        {
            lines: [
                {
                    content: "SELECT last_name FROM person;",
                    num: 1,
                    tokens: [
                        ["keyword", "select"],
                        ["table_reference", "last_name"],
                        ["keyword", "from"],
                        ["table_reference", "person;"]
                    ]
                }
            ]
        }
    ],
    [
        "SELECT * FROM person WHERE name = 'test';",
        {
            lines: [
                {
                    content: "SELECT * FROM person WHERE name = 'test';",
                    num: 1,
                    tokens: [
                        ["keyword", "select"],
                        ["table_reference", "*"],
                        ["keyword", "from"],
                        ["table_reference", "person"],
                        ["keyword", "where"],
                        ["???", "name"],
                        ["???", "="],
                        ["???", "'test';"]
                    ]
                }
            ]
        }
    ]
])("It tokenises a select correctly", (query, expected) => {
    const tokeniser = new select_1.Select();
    const q = reader_1.putContentIntoLines(query);
    const actual = tokeniser.tokenise(q[0]);
    expect(actual).toMatchObject(expected);
});
test.each([
    [
        "USE ;",
        {
            lines: [
                {
                    content: "USE ;",
                    num: 1,
                    tokens: [["keyword", "use"], ["table_reference", ";"]]
                }
            ]
        }
    ],
    [
        "USE symfony ;",
        {
            lines: [
                {
                    content: "USE symfony ;",
                    num: 1,
                    tokens: [
                        ["keyword", "use"],
                        ["table_reference", "symfony"],
                        ["table_reference", ";"]
                    ]
                }
            ]
        }
    ],
    [
        "use symfony pricing ;",
        {
            lines: [
                {
                    content: "use symfony pricing ;",
                    num: 1,
                    tokens: [
                        ["keyword", "use"],
                        ["table_reference", "symfony"],
                        ["table_reference", "pricing"],
                        ["table_reference", ";"]
                    ]
                }
            ]
        }
    ]
])("It tokenises a `use` correctly", (query, expected) => {
    const q = reader_1.putContentIntoLines(query);
    const tokeniser = new use_1.Use();
    const actual = tokeniser.tokenise(q[0]);
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
    const tokeniser = new select_1.Select();
    const actual = tokeniser.extractTableReference(tableReference);
    expect(actual).toMatchObject(expected);
});
test("We correctly read a file", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 5)
    ];
    const expected = [query];
    const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
    const actual = reader_1.putContentIntoLines(input);
    expect(actual).toEqual(expected);
});
test("We correctly reconstruct our query from lines", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 5)
    ];
    const expected = "DELETE FROM  person WHERE  age > 5;";
    const actual = query.getContent();
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=main.test.js.map