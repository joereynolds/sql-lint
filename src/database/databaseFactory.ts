import IDatabase from "./interface";
import MySqlDatabase from "./mySqlDatabase";
import PostgresDatabase from "./postgresDatabase";

export default function databaseFactory(
  driver: string,
  host: string,
  user: string,
  password: string,
  database: string,
  port?: number
): IDatabase {
  switch (driver) {
    case "mysql":
      return new MySqlDatabase(host, user, password, database, port);
    case "postgres":
      return new PostgresDatabase(host, user, password, database, port);
    default:
      throw new Error(`${driver} driver is unsupported`);
  }
}
