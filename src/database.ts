import * as mysql from "mysql";

class Database {

    public connection: mysql.Connection;

    constructor(host: string, user: string, password: string) {
        this.connection = this.connect(host, user, password)
    }

    public connect(host: string, user: string, password: string) {
        const connection = mysql.createConnection({
            host,
            user,
            password
        });

        connection.connect(err => {
            if (err) {
                return console.log(err);
            }
            return console.log(`Connected as ${connection.threadId}`);
        });

        return connection;
    }

    public getDatabases(connection: mysql.Connection) {
        const databases: string[] = [];
        connection.query('SHOW DATABASES', (error, results, fields) => {
            if (error) {
                return console.log(error);
            }
            results.forEach((result: any) => {
                databases.push(result.Database)
            })
        });
    }
}

export { Database };
