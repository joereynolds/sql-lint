import { InvalidCreateOption } from "../../../../../src/checker/checks/create/invalidCreateOption";
import { tokenise } from "../../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["CREATE TABLE person;", ""],
  [
    "CREATE JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/
  ]
])("it warns about invalid options in DROPs", (query, expected) => {
  const checker = new InvalidCreateOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
