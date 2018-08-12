import { OddCodePoint } from "../../src/checker/Generic_OddCodePoint";
import { tokenise } from "../../src/lexer/lexer"

test.each([
    ["SELECT 1", ""],
    ["SELECT name FROM person WHERE name ='Jane Doe'", ""],
    ["SELECT name FROM person WHERE name ='�'", "Bad code point"],
])("it finds bad codepoints in a query", (query, expected) => {
    const checker = new OddCodePoint();
    const tokenised = tokenise(query)
    const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
