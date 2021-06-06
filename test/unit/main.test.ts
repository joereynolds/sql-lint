import sqlLint from "../../src/main";

test.each([
  [
    "DELETE FROM some_table;",
    {
      line: 1,
      error: "[sql-lint: missing-where] DELETE statement missing WHERE clause.",
    },
  ],
  [
    "SELECT some_column FROM tbl_table;",
    {
      line: 1,
      error:
        "[sql-lint: hungarian-notation] Hungarian notation present in query",
    },
  ],
  [
    `
      SELECT some_column 
      FROM some_table;
    `,
    {
      line: 2,
      error: "[sql-lint: trailing-whitespace] Trailing whitespace",
    },
  ],
])("it can run programmatically", async (sql, expected) => {
  const errors = await sqlLint({ sql: sql });
  expect(errors[0]).toMatchObject(expected);
});

test("it can return multiple errors", async () => {
  const sql = `
    DELETE FROM some_table;
    SELECT some_column FROM tbl_table;
    SELECT some_column 
    FROM some_table;
  `;
  const errors = await sqlLint({ sql: sql });
  expect(errors).toHaveLength(3);
  expect(errors[0]).toMatchObject({
    line: 2,
    error: "[sql-lint: missing-where] DELETE statement missing WHERE clause.",
  });
  expect(errors[1]).toMatchObject({
    line: 3,
    error: "[sql-lint: hungarian-notation] Hungarian notation present in query",
  });
  expect(errors[2]).toMatchObject({
    line: 4,
    error: "[sql-lint: trailing-whitespace] Trailing whitespace",
  });
});

test("it returns an empty array when there are no errors", async () => {
  const errors = await sqlLint({
    sql: "SELECT some_column FROM some_table;",
  });
  expect(Array.isArray(errors)).toBe(true);
  expect(errors).toHaveLength(0);
});

jest.mock("mysql2", () => {
  const mock = {
    createConnection: (config) => {
      expect(config).toEqual({
        port: 5000,
        user: "user",
        host: "localhost",
        password: "password",
      });
      return mock;
    },
    query: (query, callback) => {
      callback({
        code: "name",
        sqlMessage: "[ER_BAD_DB_ERROR] Unknown database 'my_database'",
      });
    },
    end: () => true,
  };
  return mock;
});

test("it uses db connection is provided", async () => {
  const params = {
    port: 5000,
    user: "user",
    host: "localhost",
    password: "password",
    sql: "SELECT some_column FROM my_database.some_table;",
  };

  expect(await sqlLint(params)).toMatchObject([
    {
      line: 1,
      error: "[name] [ER_BAD_DB_ERROR] Unknown database 'my_database'",
    },
  ]);
});

jest.mock("pg", () => {
  const mock = {
    Pool: function (config) {
      expect(config).toEqual({
        host: "localhost",
        user: "user",
        password: "password",
        port: 5432,
      });
      return mock;
    },
    query: (query, callback) => {
      callback({
        name: "name",
        message: "[ER_BAD_DB_ERROR] Unknown database 'my_database'",
      });
    },
    end: () => true,
  };
  return mock;
});

test("it uses correct driver when provided", async () => {
  const params = {
    driver: "postgres",
    host: "localhost",
    password: "password",
    port: 5432,
    sql: "SELECT some_column FROM my_database.some_table;",
    user: "user",
  };

  expect(await sqlLint(params)).toMatchObject([
    {
      line: 1,
      error: "[name] [ER_BAD_DB_ERROR] Unknown database 'my_database'",
    },
  ]);
});
