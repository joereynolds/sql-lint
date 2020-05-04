import { InvalidAlterOption } from "../../../../../src/checker/checks/invalidAlterOption";
import { tokenise } from "../../../../../src/parser/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["ALTER TABLE person;", ""],
  [
    "ALTER JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/
  ]
])("it warns about invalid options in ALTERs", (query, expected) => {
  const checker = new InvalidAlterOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
