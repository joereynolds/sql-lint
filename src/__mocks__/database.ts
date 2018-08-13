import * as mysql from "mysql";

export class Database {

    public getDatabases(connection: mysql.Connection) {
        return [
            "existing_db"
        ];
    }
}
