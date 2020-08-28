import { categorise, extractTableReference } from "../../../src/lexer/lexer";

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

  // DECLARE statements
  ["DECLARE p_test_statement DECIMAL(10,2)", "declare"],

  // LEAVE statements
  ["LEAVE some_stored_procedure", "leave"],

  // CALL statements
  ["CALL some_stored_procedure", "call"],

  // REPLACE statements
  ["REPLACE table_name", "replace"],

  // RETURN statements
  ["RETURN 4", "return"],

  // SHOW statements
  ["SHOW TABLES FROM some_database", "show"],

  // USE statements
  ["USE symfony", "use"],
  ["use symfony;", "use"],
])("Queries are categorised correctly", (query, expected) => {
  const actual = categorise(query);
  expect(actual).toEqual(expected);
});

test.each([
  [
    "symfony.gigs.venue",
    {
      database: "symfony",
      table: "gigs",
      column: "venue",
    },
  ],
  [
    "gigs",
    {
      table: "gigs",
    },
  ],
  [
    "symfony.gigs",
    {
      database: "symfony",
      table: "gigs",
    },
  ],
])("Table references are correctly categorised", (tableReference, expected) => {
  const actual = extractTableReference(tableReference);
  expect(actual).toMatchObject(expected);
});

test("We return an empty string on a query that cannot be categorised", () => {
  const query = "Not a query SELECT * FROM l";
  expect(categorise(query)).toEqual("");
});
