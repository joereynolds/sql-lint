import PostgresDatabase from "../../../src/database/postgresDatabase";

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

      callback(undefined, {});
    },
    end: () => true,
  };
  return mock;
});

test("lintQuery is null when there are no errors", async () => {
  const db = new PostgresDatabase("localhost", "user", "password", 5432);
  const sql = "SELECT some_column FROM some_table WHERE id = 1";

  expect(await db.lintQuery(sql)).toBeNull();
});
