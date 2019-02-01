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
        connection.query('SHOW DATABASES', (error, results, fields) => {
            if (error) {
                return console.log(error);
            }
            callback(results);
        });
    }
    /**
     * Gets all tables for a database
     */
    getTables(connection, database, callback) {
        connection.query(`SHOW TABLES FROM ${database}`, (error, results, fields) => {
            if (error) {
                return console.log(error);
            }
            callback(results);
        });
    }
    /**
     * Runs an EXPLAIN on the query. If it doesn't run successfully, errors will come through,
     * which is what we want.
     */
    lintQuery(connection, query, callback) {
        connection.query(`EXPLAIN ${query}`, (error, results, fields) => {
            if (error) {
                callback(error);
            }
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map