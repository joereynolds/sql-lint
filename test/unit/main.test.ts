import sqlLint from "../../src/main";

test.each([
  [
    "DELETE FROM some_table;",
    {
      line: 1,
      error: '[sql-lint: missing-where] DELETE statement missing WHERE clause.',
    } 
  ],
  [
    "SELECT some_column FROM tbl_table;",
    {
      line: 1,
      error: '[sql-lint: hungarian-notation] Hungarian notation present in query',
    } 
  ],
  [
    `
      SELECT some_column 
      FROM some_table;
    `,
    {
      line: 2,
      error: '[sql-lint: trailing-whitespace] Trailing whitespace',
    } 
  ],
])(
  "it can run programmatically",
  (sql, expected) => {
    const errors = sqlLint({ sql: sql });
    console.log(errors);
    expect(errors[0]).toMatchObject(expected);
  },
);

test("it can return multiple errors", () => {
  const sql = `
    DELETE FROM some_table;
    SELECT some_column FROM tbl_table;
    SELECT some_column 
    FROM some_table;
  `;
  const errors = sqlLint({ sql: sql });
  expect(errors).toHaveLength(3);
  expect(errors[0]).toMatchObject(    {
    line: 2,
    error: '[sql-lint: missing-where] DELETE statement missing WHERE clause.',
  });
  expect(errors[1]).toMatchObject({
    line: 3,
    error: '[sql-lint: hungarian-notation] Hungarian notation present in query',
  });
  expect(errors[2]).toMatchObject({
    line: 4,
    error: '[sql-lint: trailing-whitespace] Trailing whitespace',
  });
});

test("it returns an empty array when there are no errors", () => {
  const errors = sqlLint({
    sql: "SELECT some_column FROM some_table",
  });
  expect(Array.isArray(errors)).toBe(true);
  expect(errors).toHaveLength(0);
});
