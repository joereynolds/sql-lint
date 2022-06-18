import * as mysql from "mysql2";
import IDatabase, { sqlError } from "./interface";

export default class MySqlDatabase implements IDatabase {
  private connection: mysql.Connection;

  constructor(host: string, user: string, password: string, port?: number) {
    this.connection = mysql.createConnection({
      host,
      user,
      password,
      port,
    });
  }

  public lintQuery(query: string): Promise<sqlError | null> {
    return new Promise<sqlError | null>((resolve) => {
      this.connection.query(`EXPLAIN ${query}`, (err) => {
        if (err) {
          resolve((err as unknown) as sqlError);
          return;
        }

        // resolve with null if there is no error.
        resolve(null);
      });
    });
  }

  public end(): void {
    this.connection.end();
  }
}
