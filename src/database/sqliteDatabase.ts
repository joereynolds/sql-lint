import * as sqlite3 from "sqlite3";
import IDatabase, { sqlError } from "./interface";

export default class SqliteDatabase implements IDatabase {
  private db: sqlite3.Database;

  constructor(path: string) {
    this.db = new sqlite3.Database(path);
  }

  public lintQuery(query: string): Promise<sqlError | null> {
    return new Promise<sqlError | null>((resolve) => {
      this.db.all(`EXPLAIN QUERY PLAN ${query}`, (err) => {
        if (err) {
          resolve({
            code: err.name,
            sqlMessage: err.message,
          });
          return;
        }
        resolve(null);
      });
    });
  }

  public end(): void {
    this.db.close();
  }
}
