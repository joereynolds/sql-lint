import {
  putContentIntoLines,
  getQueryFromLine,
} from "../../../src/reader/reader";
import { Query } from "../../../src/reader/query";
import { Line } from "../../../src/reader/line";

beforeEach(() => {
  this.query = new Query();
  this.query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 5),
  ];

  this.queryWithComments = new Query();
  this.queryWithComments.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 6),
  ];
});

test("We correctly read a file", () => {
  const expected: any = [this.query];
  const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test.each([
  // Test we ignore '--' comments
  ["DELETE\n FROM \n\n person WHERE \n-- Remove old people\n age > 5;"],

  // We ignore '#' comments
  ["DELETE\n FROM \n\n person WHERE \n# Remove old people\n age > 5;"],

  // We ignore '/*' comments on a single line
  ["DELETE\n FROM \n\n person WHERE \n/* Remove old people*/\n age > 5;"],
])("We ignore comments in files", (input) => {
  const actual = putContentIntoLines(input);
  expect(actual).toEqual([this.queryWithComments]);
});

test("We correctly reconstruct our query from lines", () => {
  const expected: string = "DELETE FROM  person WHERE  age > 5;";
  const actual = this.query.getContent();
  expect(actual).toEqual(expected);
});

test("We correctly construct lines in a query from a string", () => {
  const expected: any = [this.query];

  const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
  const actual = getQueryFromLine(input);
  expect(actual).toEqual(expected);
});

test("We should ignore multiline comments", () => {
  const input =
    "/*\n * catpants\n*/DELETE\n FROM \n\n person /*comment */WHERE \n/*\n\n this is useless*/ age > 5;";

  expect(getQueryFromLine(input)).toEqual([this.query]);
});
