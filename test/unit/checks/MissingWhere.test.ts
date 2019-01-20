import { MissingWhere } from "../../../src/checker/delete/missingWhere";
import { tokenise } from "../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../src/reader/reader";

test.each([
  ["DELETE FROM person WHERE name = 'Jon';", ""],
  ["DELETE FROM person;", "DELETE missing WHERE, intentional?"]
])("it finds missing WHEREs in DELETEs", (query, expected) => {
  const checker = new MissingWhere();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
