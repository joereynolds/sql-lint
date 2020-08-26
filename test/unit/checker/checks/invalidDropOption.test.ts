import { InvalidDropOption } from "../../../../src/checker/checks/invalidDropOption";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["DROP TABLE person;", ""],
  [
    "DROP JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/,
  ],
])("it warns about invalid options in DROPs", (query, expected) => {
  const checker = new InvalidDropOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
