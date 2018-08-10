import { categorise } from "../../src/lexer/lexer";
import { Select } from "../../src/lexer/select";

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
  [" select * from person", "select"]
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
    ],
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
      ["???", "'test'"],
    ]
  ]
])("It tokenises a select correctly", (query, expected) => {
  const tokeniser = new Select();
  const actual = tokeniser.tokenise(query);
  expect(actual).toEqual(expected);
});
