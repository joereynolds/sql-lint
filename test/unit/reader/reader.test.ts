import {
  putContentIntoLines,
  getQueryFromLine,
} from "../../../src/reader/reader";
import { Query } from "../../../src/reader/query";
import { Line } from "../../../src/reader/line";
let query, queryWithComments;
beforeEach(() => {
  query = new Query();
  query.lines = [
    new Line(" DELETE", 1),
    new Line("FROM", 2),
    new Line("person WHERE", 4),
    new Line(" age > 5;", 5),
  ];

  queryWithComments = new Query();
  queryWithComments.lines = [
    new Line("DELETE", 1),
    new Line("FROM", 2),
    new Line("person WHERE", 4),
    new Line("age > 5;", 6),
  ];
});

test("We correctly read a file", () => {
  const expected: any = [query];
  const input = " DELETE\nFROM\n\nperson WHERE\n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test.each([
  // Test we ignore '--' comments
  ["DELETE\nFROM\n\nperson WHERE\n-- Remove old people\nage > 5;"],

  // We ignore '#' comments
  ["DELETE\nFROM\n\nperson WHERE\n# Remove old people\nage > 5;"],

  // We ignore '/*' comments on a single line
  ["DELETE\nFROM\n\nperson WHERE\n/* Remove old people*/\nage > 5;"],
])("We ignore comments in files", (input) => {
  const actual = putContentIntoLines(input);
  expect(actual).toEqual([queryWithComments]);
});

test("We correctly reconstruct our query from lines", () => {
  const expected: string = "DELETE FROM person WHERE age > 5;";
  const actual = query.getContent();
  expect(actual).toEqual(expected);
});

test("We correctly construct lines in a query from a string", () => {
  const expected: any = [query];

  const input = " DELETE\nFROM\n\nperson WHERE\n age > 5;";
  const actual = getQueryFromLine(input);
  expect(actual).toEqual(expected);
});

test("We should ignore multiline comments", () => {
  const input =
    "/*\n * catpants\n*/DELETE\nFROM\n\nperson/*comment */WHERE\n/*\n\n this is useless*/age > 5;";

  expect(getQueryFromLine(input)).toEqual([query]);
});
