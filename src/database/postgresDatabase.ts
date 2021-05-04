import { Pool } from 'pg';
import IDatabase from './interface';

export default class PostgresDatabase implements IDatabase {
  private pool: Pool;

  constructor(
    host: string,
    user: string,
    password: string,
    port?: number,
  ) {
    this.pool = new Pool({
      host,
      user,
      password,
      port,
    });
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

  public end(): void {
    this.pool.end();
  }
}
