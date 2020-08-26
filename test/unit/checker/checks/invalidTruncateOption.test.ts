import { InvalidTruncateOption } from "../../../../src/checker/checks/invalidTruncateOption";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["TRUNCATE TABLE person;", ""],
  [
    "TRUNCATE JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/,
  ],
])("it warns about invalid options in TRUNCATEs", (query, expected) => {
  const checker = new InvalidTruncateOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
