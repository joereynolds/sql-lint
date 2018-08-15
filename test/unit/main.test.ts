import { categorise } from "../../src/lexer/lexer";
import { Select } from "../../src/lexer/select";
import { Tokens } from "../../src/lexer/tokens";
import { Use } from "../../src/lexer/use";
import { Line, putContentIntoLines, Query } from "../../src/reader/reader";

test("The framework is running", () => {
  expect(1).toEqual(1);
});

test("Tokens are populated with a query on instantiation", () => {
  const actual = new Tokens("SELECT * FROM test");
  const expected = "SELECT * FROM test";
  expect(actual.content).toEqual(expected);
});

test("Tokens can retrieve their content", () => {
  const t = new Tokens("SELECT * FROM test");
  const actual = t.getContent();
  const expected = "SELECT * FROM test";
  expect(actual).toEqual(expected);
});

test("Tokens can add a token", () => {
  const t = new Tokens("");
  t.addToken("keyword");
  const actual = t.getTokens();
  const expected = ["keyword"];
  expect(actual).toEqual(expected);
});

test("Tokens can retrieve their tokenised content", () => {
  const t = new Tokens("SELECT * FROM test");

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
  const actual = categorise(query);
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
  const tokeniser = new Select();
  const actual = tokeniser.tokenise(query).getTokenised();
  expect(actual).toEqual(expected);
});

test.each([
  ["USE", [["keyword", "use"]]],
  ["USE symfony", [["keyword", "use"], ["table_reference", "symfony"]]],
  ["use symfony pricing", [["keyword", "use"], ["table_reference", "symfony"]]]
])("It tokenises a `use` correctly", (query, expected) => {
  const tokeniser = new Use();
  const actual = tokeniser.tokenise(query).getTokenised();
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
  const tokeniser = new Select();
  const actual = tokeniser.extractTableReference(tableReference);
  expect(actual).toEqual(expected);
});

test("We correctly read a file", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 5)
  ];
  const expected: any = [query];

  const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test("We correctly reconstruct our query from lines", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 5)
  ];

  const expected: string = "DELETE FROM  person WHERE  age > 5;";
  const actual = query.getContent();
  expect(actual).toEqual(expected);
});
