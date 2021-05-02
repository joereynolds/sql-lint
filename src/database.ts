import { Pool } from "pg";
import * as mysql from "mysql2";

export default function databaseFactory(
  driver: string,
  config: any,
): IDatabase {
  switch (driver) {
    case 'mysql':
      return new MySqlDatabase(config);
    case 'postgres':
      return new PostgresDatabase(config);
    default:
      throw new Error(`${driver} driver is unsupported`);
  }
}

export interface IDatabase {
  /**
   * Runs an EXPLAIN on the query. If it doesn't run successfully, errors will come through,
   * which is what we want.
   */
  lintQuery(query: string, callback: any): void
  end(): void
}

class MySqlDatabase implements IDatabase {
  private connection: mysql.Connection;

  constructor (config) {
    this.connection = mysql.createConnection(config);
  }

  public lintQuery(query: string, callback: any): void {
    this.connection.query(`EXPLAIN ${query}`, err => {
      if (err) {
        callback(err);
      }
    });
  }

  public end() {
    this.connection.end();
  }
}

class PostgresDatabase implements IDatabase {
  private pool: Pool;

  constructor(config) {
    this.pool = new Pool(config);
  }

  public lintQuery(query: string, callback: any): void {
    this.pool.query(`EXPLAIN ${query}`, err => {
      if (err) {
        callback({
          code: err.name,
          sqlMessage: err.message,
        });
      }
    });
  }

  public end() {
    this.pool.end();
  }
}
