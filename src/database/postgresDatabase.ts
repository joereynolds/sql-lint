import { Pool } from "pg";
import IDatabase, { sqlError } from "./interface";

export default class PostgresDatabase implements IDatabase {
  private pool: Pool;

  constructor(host: string, user: string, password: string, port?: number) {
    this.pool = new Pool({
      host,
      user,
      password,
      port,
    });
  }

  public async lintQuery(query: string): Promise<sqlError | null> {
    return new Promise<sqlError | null>((resolve) => {
      this.pool.query(`EXPLAIN ${query}`, (err) => {
        if (err) {
          resolve({
            code: err.name,
            sqlMessage: err.message,
          });
          return;
        }

        // resolve with null if there is no error.
        resolve(null);
      });
    });
  }

  public end(): void {
    this.pool.end();
  }
}
