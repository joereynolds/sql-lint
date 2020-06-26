"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByExtension = void 0;
const fs = require("fs");
const path = require("path");
function findByExtension(base, ext, files, result) {
    files = files || fs.readdirSync(base);
    result = result || [];
    files.forEach((file) => {
        const newbase = path.join(base, file);
        if (fs.statSync(newbase).isDirectory()) {
            result = findByExtension(newbase, ext, fs.readdirSync(newbase), result);
        }
        else {
            if (file.substr(-1 * (ext.length + 1)) === "." + ext &&
                typeof result !== "undefined") {
                result.push(newbase);
            }
        }
    });
    return result;
}
exports.findByExtension = findByExtension;
//# sourceMappingURL=file.js.map