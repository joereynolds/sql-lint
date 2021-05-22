import sqlLint from "../../src/main";

test("it runs the linter programmatically", () => {
  const errors = sqlLint({
    sql: "DELETE FROM some_table"
  });
  expect(errors).toHaveLength(1);
});
