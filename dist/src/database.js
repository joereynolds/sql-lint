"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class Database {
    constructor(host, user, password) {
        this.connection = this.connect(host, user, password);
    }
    connect(host, user, password) {
        const connection = mysql.createConnection({
            host,
            user,
            password
        });
        connection.connect(err => {
            if (err) {
                return console.log(err);
            }
        });
        return connection;
    }
    getDatabases(connection, callback) {
        const databases = [];
        connection.query('SHOW DATABASES', (error, results, fields) => {
            if (error) {
                return console.log(error);
            }
            callback(results);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map