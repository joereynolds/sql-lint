import * as mysql from 'mysql2';
import IDatabase from './interface';

export default class MySqlDatabase implements IDatabase {
  private connection: mysql.Connection;

  constructor (
    host: string,
    user: string,
    password: string,
    port?: number,
  ) {
    this.connection = mysql.createConnection({
      host,
      user,
      password,
      port,
    });
  }

  public lintQuery(query: string, callback: any): void {
    this.connection.query(`EXPLAIN ${query}`, err => {
      if (err) {
        callback(err);
      }
    });
  }

  public end(): void {
    this.connection.end();
  }
}
