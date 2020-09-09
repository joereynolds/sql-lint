import { InvalidCreateOption } from "../../../../src/checker/checks/invalidCreateOption";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["CREATE TABLE person;", ""],
  ["CREATE SCHEMA person;", ""],
  [
    "CREATE JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/,
  ],
  ["CREATE OR REPLACE some_table;", ""],
  ["CREATE UNIQUE INDEX some_index;", ""],
])("it warns about invalid options in CREATEs", (query, expected) => {
  const checker = new InvalidCreateOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
