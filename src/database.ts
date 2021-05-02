import { Pool } from "pg";
import * as mysql from "mysql2";

class Database {
  public connection: mysql.Connection|Pool;

  constructor(
    driver: string,
    host: string,
    user: string,
    password: string,
    port?: number
  ) {
    const config = {
      host,
      password,
      port,
      user,
    };

    switch (driver) {
      case 'mysql':
        this.connection = mysql.createConnection(config);
        break;
      case 'postgres':
        this.connection = new Pool(config);
        break;
      default:
        throw new Error(`${driver} driver is unsupported`);
    }
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
    query: string,
    callback: any
  ): void {
    if (this.connection instanceof Pool) {
      this.connection.query(`EXPLAIN ${query}`, error => {
        if (error) {
          callback({
            code: error.name,
            sqlMessage: error.message,
          })
        }
      });

      return;
    }

    this.connection.query(`EXPLAIN ${query}`, error => {
      if (error) {
        callback(error);
      }
    });
  }
}

export { Database };
