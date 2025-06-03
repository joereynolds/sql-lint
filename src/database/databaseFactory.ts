import IDatabase from "./interface";
import MySqlDatabase from "./mySqlDatabase";
import PostgresDatabase from "./postgresDatabase";

export default function databaseFactory(
  driver: string,
  host: string,
  user: string,
  password: string,
  port?: number,
  database?: string,
): IDatabase {
  switch (driver) {
    case "mysql":
      return new MySqlDatabase(host, user, password, port, database);
    case "postgres":
      return new PostgresDatabase(host, user, password, port, database);
    default:
      throw new Error(`${driver} driver is unsupported`);
  }
}
