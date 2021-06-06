"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySqlDatabase_1 = require("./mySqlDatabase");
const postgresDatabase_1 = require("./postgresDatabase");
function databaseFactory(driver, host, user, password, port) {
    switch (driver) {
        case "mysql":
            return new mySqlDatabase_1.default(host, user, password, port);
        case "postgres":
            return new postgresDatabase_1.default(host, user, password, port);
        default:
            throw new Error(`${driver} driver is unsupported`);
    }
}
exports.default = databaseFactory;
//# sourceMappingURL=databaseFactory.js.map