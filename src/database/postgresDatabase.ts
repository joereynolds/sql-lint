import { Pool } from "pg";
import IDatabase, { sqlError } from "./interface";

export default class PostgresDatabase implements IDatabase {
  private pool: Pool;

  constructor(
    host: string,
    user: string,
    password: string,
    database: string,
    port?: number
  ) {
    this.pool = new Pool({
      host,
      user,
      password,
      database,
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
        }
      });
    });
  }

  public end(): void {
    this.pool.end();
  }
}
