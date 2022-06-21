import sqlLint from "../../src/main";

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
    query: (_, callback) => {
      callback(undefined, {});
    },
    end: () => true,
  };
  return mock;
});

test("no errors when mysql DB query runs successfully", async () => {
  const params = {
    port: 5000,
    user: "user",
    host: "localhost",
    password: "password",
    sql: "SELECT some_column FROM my_database.some_table;",
  };

  expect(await sqlLint(params)).toMatchObject([]);
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
    query: (_, callback) => {
      callback(undefined, {});
    },
    end: () => {},
  };
  return mock;
});

test("no errors when postgres DB query runs successfully", async () => {
  const params = {
    driver: "postgres",
    host: "localhost",
    password: "password",
    port: 5432,
    sql: "SELECT some_column FROM my_database.some_table;",
    user: "user",
  };

  expect(await sqlLint(params)).toMatchObject([]);
});
