"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
class MySqlDatabase {
    constructor(host, user, password, port) {
        this.connection = mysql.createConnection({
            host,
            user,
            password,
            port,
        });
    }
    lintQuery(query, callback) {
        this.connection.query(`EXPLAIN ${query}`, err => {
            if (err) {
                callback(err);
            }
        });
    }
    end() {
        this.connection.end();
    }
}
exports.default = MySqlDatabase;
//# sourceMappingURL=mySqlDatabase.js.map