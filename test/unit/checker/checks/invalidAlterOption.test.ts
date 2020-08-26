import { InvalidAlterOption } from "../../../../src/checker/checks/invalidAlterOption";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test("It is applied to the correct category", () => {
  const checker = new InvalidAlterOption();
  const expected = "alter";
  const actual = checker.appliesTo[0];
  expect(actual).toEqual(expected);
});

test.each([
  ["ALTER TABLE person;", ""],
  [
    "ALTER JIBBERISH person;",
    /Option 'jibberish' is not a valid option, must be one of .*/,
  ],
])("it warns about invalid options in ALTERs", (query, expected) => {
  const checker = new InvalidAlterOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toMatch(expected);
});
