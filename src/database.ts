import * as anyDB from "any-db";

class Database {
  public connection: any;

  constructor(
    driver: string,
    host: string,
    user: string,
    password: string,
    port?: string
  ) {
    this.connection = anyDB.createConnection(
      `${driver}://${user}:${password}@${host}:${port}`
    );
  }

  public getDatabases(connection: any, callback: any): void {
    connection.query("SHOW DATABASES", (error: string, results: string[]) => {
      if (error) {
        return console.log(error);
      }

      callback(results);
    });
  }

  /**
   * Runs an EXPLAIN on the query. If it doesn't run successfully, errors will come through,
   * which is what we want.
   */
  public lintQuery(
    connection: anyDB.Connection,
    query: string,
    callback: any
  ): void {
    connection.query(`EXPLAIN ${query}`, [], (error, results) => {
      if (error) {
        callback(error);
      }
    });
  }
}

export { Database };
