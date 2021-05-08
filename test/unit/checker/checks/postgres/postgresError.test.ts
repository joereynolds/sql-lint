import { PostgresError } from "../../../../../src/checker/checks/postgres/postgresError";
import { tokenise } from "../../../../..//src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test("It brings back the error from the server", () => {
  const query = "SELECT stuff FROM things ;";
  const checker = new PostgresError({
    code: "test code",
    sqlMessage: "You have an error.",
  });

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const expected = {
    additionalInformation: "",
    content: "[test code] You have an error.",
    line: 1,
  };
  const actual = checker.check(tokenised);
  expect(actual).toEqual(expected);
});

test("It only lints select, delete, insert, replace, and update", () => {
  const query = "USE test ;";
  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);
  const checker = new PostgresError({});
  const actual = checker.check(tokenised);
  const expected = { additionalInformation: "", content: "", line: 0 };
  expect(actual).toEqual(expected);
});
