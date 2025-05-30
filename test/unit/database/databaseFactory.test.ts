import databaseFactory from "../../../src/database/databaseFactory";
import MySqlDatabase from "../../../src/database/mySqlDatabase";
import PostgresDatabase from "../../../src/database/postgresDatabase";

jest.mock("mysql2", () => {
  const mock = {
    createConnection: () => mock,
  };
  return mock;
});

jest.mock("pg", () => {
  const mock = {
    Pool: function () {
      return mock;
    },
  };
  return mock;
});

test.each([
  ["mysql", MySqlDatabase],
  ["postgres", PostgresDatabase],
])("it returns correct instance for driver", (driver, expected) => {
  const database = databaseFactory(
    driver,
    "localhost",
    "user",
    "password",
    3306
  );
  expect(database).toBeInstanceOf(expected);
});

test("it throws an exception if driver is not supported", () => {
  const t = () =>
    databaseFactory("mongodb", "localhost", "user", "password", 3306);
  expect(t).toThrow(Error);
});

test("it does not call callback if there is no error", () => {
  const callback = jest.fn(() => true);

  jest.mock("mysql2", () => {
    const mock = {
      createConnection: () => mock,
      query: () => true,
    };
    return mock;
  });

  expect(callback.mock.calls.length).toBe(0);
});
