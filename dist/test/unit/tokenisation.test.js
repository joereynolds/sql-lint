"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../../src/lexer/lexer");
const select_1 = require("../../src/lexer/statements/select");
const use_1 = require("../../src/lexer/statements/use");
const update_1 = require("../../src/lexer/statements/update");
const drop_1 = require("../../src/lexer/statements/drop");
const reader_1 = require("../../src/reader/reader");
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
                        ["table_reference", "person"]
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
                        ["table_reference", "person"]
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
                    tokens: [["keyword", "use"]]
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
        "UPDATE ;",
        {
            lines: [
                {
                    content: "UPDATE ;",
                    num: 1,
                    tokens: [["keyword", "update"]]
                }
            ]
        }
    ],
    [
        "UPDATE symfony.gig ;",
        {
            lines: [
                {
                    content: "UPDATE symfony.gig ;",
                    num: 1,
                    tokens: [
                        ["keyword", "update"],
                        ["table_reference", "symfony.gig"],
                    ]
                }
            ]
        }
    ],
])("It tokenises an `update` correctly", (query, expected) => {
    const q = reader_1.putContentIntoLines(query);
    const tokeniser = new update_1.Update();
    const actual = tokeniser.tokenise(q[0]);
    expect(actual).toEqual(expected);
});
test.each([
    [
        "DROP ;",
        {
            lines: [
                {
                    content: "DROP ;",
                    num: 1,
                    tokens: [
                        ["keyword", "drop"]
                    ]
                }
            ]
        }
    ],
    [
        "DROP TABLE ;",
        {
            lines: [
                {
                    content: "DROP TABLE ;",
                    num: 1,
                    tokens: [
                        ["keyword", "drop"],
                        ["drop_item", "table"]
                    ]
                }
            ]
        }
    ],
    [
        "DROP DATABASE ;",
        {
            lines: [
                {
                    content: "DROP DATABASE ;",
                    num: 1,
                    tokens: [
                        ["keyword", "drop"],
                        ["drop_item", "database"]
                    ]
                }
            ]
        }
    ],
])("It tokenises a `drop` correctly", (query, expected) => {
    const q = reader_1.putContentIntoLines(query);
    const tokeniser = new drop_1.Drop();
    const actual = tokeniser.tokenise(q[0]);
    expect(actual).toEqual(expected);
});
test.each([
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
                        ["table_reference", "person"]
                    ]
                }
            ]
        }
    ]
])("It tokenises correctly when called through tokenise", (query, expected) => {
    const q = reader_1.putContentIntoLines(query);
    const actual = lexer_1.tokenise(q[0]);
    expect(actual).toMatchObject(expected);
});
//# sourceMappingURL=tokenisation.test.js.map