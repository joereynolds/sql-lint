import { InvalidLimitQuantifier } from "../../../../src/checker/checks/invalidLimitQuantifier";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["SELECT name FROM person LIMIT 5;", ""],
  [
    "SELECT name FROM person LIMIT 'test';",
    "[sql-lint: invalid-limit-quantifier] Argument 'test' is not a valid quantifier for LIMIT clause.",
  ],
])("it finds bad codepoints in a query", (query, expected) => {
  const checker = new InvalidLimitQuantifier();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
