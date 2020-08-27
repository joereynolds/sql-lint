import { UnmatchedParentheses } from "../../../../src/checker/checks/unmatchedParentheses";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["SELECT name FROM person WHERE (SELECT age > 4);", ""],

  [
    "SELECT name FROM person WHERE (SELECT age > 4;",
    "[sql-lint: unmatched-parentheses] Unmatched parentheses.",
  ],
  [
    "SELECT name FROM person WHERE (SELECT age > 4;))",
    "[sql-lint: unmatched-parentheses] Unmatched parentheses.",
  ],
])("It detects unmatched parentheses in a query", (query, expected) => {
  const checker = new UnmatchedParentheses();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
