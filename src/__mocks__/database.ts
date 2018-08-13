import * as mysql from "mysql";

export class Database {

    public getDatabases(connection: mysql.Connection): string[] {
        return [
            "existing_db"
        ];
    }
}
