import sqlLint from "../../src/main";

test("it runs the linter programmatically", () => {
  const errors = sqlLint({
    sql: "DELETE FROM some_table;",
  });

  expect(errors).toHaveLength(1);
  expect(errors[0]).toMatchObject({
    line: 1,
    error: '[sql-lint: missing-where] DELETE statement missing WHERE clause.',
  });
});
