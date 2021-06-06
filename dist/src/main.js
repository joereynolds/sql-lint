"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printer_1 = require("./printer");
const reader_1 = require("./reader/reader");
const json_1 = require("./formatter/formats/json");
const checkerRunner_1 = require("./checker/checkerRunner");
const databaseFactory_1 = require("./database/databaseFactory");
exports.default = async ({ sql, host, port, user = '', prefix = '', password = '', verbosity = 0, driver = 'mysql', }) => {
    const printer = new printer_1.Printer(verbosity, new json_1.JsonFormat());
    let db;
    if (host) {
        db = databaseFactory_1.default(driver, host, user, password, port);
    }
    const runner = new checkerRunner_1.CheckerRunner();
    await runner.run(reader_1.putContentIntoLines(sql), printer, prefix, [], driver, db);
    if (db) {
        db.end();
    }
    return printer.messages;
};
//# sourceMappingURL=main.js.map