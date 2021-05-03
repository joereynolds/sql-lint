import PostgresDatabase from "../../../src/database/postgresDatabase";

jest.mock("pg", () => {
  const mock = {
    Pool: function (config) {
      expect(config).toEqual({
        host: "localhost",
        user: "user",
        password: "password",
        port: 3306,
      });
      return mock;
    },
    query: (query, callback) => {
      callback({
        name: "name",
        message: "table does not exist",
      });
    },
    end: () => true,
  };
  return mock;
});

test("it calls createConnection", () => {
  const db = new PostgresDatabase("localhost", "user", "password", 3306);
});

test("it calls callback if there is an error", () => {
  const db = new PostgresDatabase("localhost", "user", "password", 3306);
  db.lintQuery("SELECT some_column FROM some_table WHERE id = 1", err => {
    expect(err.sqlMessage).toEqual("table does not exist");
    expect(err.code).toEqual("name");
  })
});

test("it calls end on connection", () => {
  const db = new PostgresDatabase("localhost", "user", "password", 3306);
  db.end();
});

test("it does not call callback if there is no error", () => {
  const callback = jest.fn(() => true);
  
  jest.mock("pg", () => {
    const mock = {
      createConnection: () => mock,
      query: () => true,
    };
    return mock;
  });

  expect(callback.mock.calls.length).toBe(0);
});