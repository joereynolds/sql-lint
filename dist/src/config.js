"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.file = void 0;
const fs = require("fs");
const os = require("os");
exports.file = `${os.homedir}/.config/sql-lint/config.json`;
function getConfiguration(config) {
    if (fs.existsSync(config)) {
        return JSON.parse(fs.readFileSync(config, "utf8"));
    }
    return null;
}
exports.getConfiguration = getConfiguration;
//# sourceMappingURL=config.js.map