"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementFactory = void 0;
const statements_1 = require("../barrel/statements");
class StatementFactory {
    build(statement) {
        let builtStatement = new statements_1.Select();
        const statementMap = {
            select: new statements_1.Select(),
            use: new statements_1.Use(),
            drop: new statements_1.Drop(),
            create: new statements_1.Create(),
            alter: new statements_1.Alter(),
            truncate: new statements_1.Truncate(),
        };
        if (Object.keys(statementMap).includes(statement)) {
            builtStatement = statementMap[statement];
        }
        return builtStatement;
    }
}
exports.StatementFactory = StatementFactory;
//# sourceMappingURL=statementFactory.js.map