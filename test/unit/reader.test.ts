import { putContentIntoLines } from "../../src/reader/reader";
import { Query } from "../../src/reader/query";
import { Line } from "../../src/reader/line";

test("We correctly read a file", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 5)
  ];
  const expected: any = [query];

  const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test("We ignore '--' comments in files", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 6)
  ];
  const expected: any = [query];

  const input =
    "DELETE\n FROM \n\n person WHERE \n-- Remove old people\n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test("We ignore '#' comments in files", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 6)
  ];
  const expected: any = [query];

  const input =
    "DELETE\n FROM \n\n person WHERE \n# Remove old people\n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test("We ignore '--' comments in files", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 6)
  ];
  const expected: any = [query];

  const input =
  "DELETE\n FROM \n\n person WHERE \n/* Remove old people*/\n age > 5;";
  const actual = putContentIntoLines(input);
  expect(actual).toEqual(expected);
});

test("We correctly reconstruct our query from lines", () => {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 5)
  ];

  const expected: string = "DELETE FROM  person WHERE  age > 5;";
  const actual = query.getContent();
  expect(actual).toEqual(expected);
});
