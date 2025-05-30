import {
  putContentIntoLines,
  getQueryFromLine,
} from "../../../src/reader/reader";
import { Query } from "../../../src/reader/query";
import { Line } from "../../../src/reader/line";

function getTestQuery(): Query {
  const query = new Query();
  query.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 5),
  ];

  return query;
}

function getTestQueryWithComments(): Query {
  const queryWithComments = new Query();
  queryWithComments.lines = [
    new Line("DELETE", 1),
    new Line(" FROM ", 2),
    new Line(" person WHERE ", 4),
    new Line(" age > 5;", 6),
  ];

  return queryWithComments;
}

test("We correctly read a file", () => {
  const expected: any = [getTestQuery()];
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
  expect(actual).toEqual([getTestQueryWithComments()]);
});

test("We correctly reconstruct our query from lines", () => {
  const query = getTestQuery()
  const expected: string = "DELETE FROM  person WHERE  age > 5;";
  const actual = query.getContent();
  expect(actual).toEqual(expected);
});

test("We correctly construct lines in a query from a string", () => {
  const query = getTestQuery()
  const expected: any = [query];

  const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
  const actual = getQueryFromLine(input);
  expect(actual).toEqual(expected);
});

test("We should ignore multiline comments", () => {
  const input =
    "/*\n * catpants\n*/DELETE\n FROM \n\n person /*comment */WHERE \n/*\n\n this is useless*/ age > 5;";

  const query = getTestQuery()
  expect(getQueryFromLine(input)).toEqual([query]);
});

test("Semicolons inside string literals do not split queries", () => {
  const input =
    "INSERT INTO table (col) VALUES ('hello; world'); SELECT * FROM table;";
  const queries = getQueryFromLine(input);
  expect(queries).toHaveLength(2);
  expect(queries[0].getContent()).toEqual(
    "INSERT INTO table (col) VALUES ('hello; world');"
  );
  expect(queries[1].getContent()).toEqual(" SELECT * FROM table;");
});

test("Escaped quotes and single quote in double quotes do not split queries", () => {
  const input =
    "INSERT INTO table (col) VALUES ('It\\'s a test; with escaped quote'); " +
    "INSERT INTO table (col) VALUES (\"This string contains a 'single quote' and ; semicolon inside\");";
  const queries = getQueryFromLine(input);
  expect(queries).toHaveLength(2);
  expect(queries[0].getContent()).toEqual(
    "INSERT INTO table (col) VALUES ('It\\'s a test; with escaped quote');"
  );
  expect(queries[1].getContent()).toEqual(
    " INSERT INTO table (col) VALUES (\"This string contains a 'single quote' and ; semicolon inside\");"
  );
});
