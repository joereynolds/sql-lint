import { OddCodePoint } from "../../src/checker/Generic_OddCodePoint";

test.each([
    ["SELECT 1", ""],
    ["SELECT name FROM person WHERE name ='Jane Doe'", ""],
    ["SELECT name FROM person WHERE name ='�'", "Bad code point"],
])("it finds bad codepoints in a query", (query, expected) => {
    const checker = new OddCodePoint();
    const actual = checker.check(query);
  expect(actual.content).toEqual(expected);
});
