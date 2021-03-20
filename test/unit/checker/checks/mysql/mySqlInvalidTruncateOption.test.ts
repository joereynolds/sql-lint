import { MySqlInvalidTruncateOption } from "../../../../../src/checker/checks/mysql/mySqlInvalidTruncateOption";
import { tokenise } from "../../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["TRUNCATE TABLE person;", ""],
  [
    "TRUNCATE JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/,
  ],
])("it warns about invalid options in TRUNCATEs", (query, expected) => {
  const checker = new MySqlInvalidTruncateOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
