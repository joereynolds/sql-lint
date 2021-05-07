"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PostgresDatabase {
    constructor(host, user, password, port) {
        this.pool = new pg_1.Pool({
            host,
            user,
            password,
            port,
        });
    }
    lintQuery(query, callback) {
        this.pool.query(`EXPLAIN ${query}`, err => {
            if (err) {
                callback({
                    code: err.name,
                    sqlMessage: err.message,
                });
            }
        });
    }
    end() {
        this.pool.end();
    }
}
exports.default = PostgresDatabase;
//# sourceMappingURL=postgresDatabase.js.map