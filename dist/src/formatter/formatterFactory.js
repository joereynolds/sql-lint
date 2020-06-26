"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatterFactory = void 0;
const simple_1 = require("./formats/simple");
const json_1 = require("./formats/json");
class FormatterFactory {
    build(format) {
        let formatter = new simple_1.SimpleFormat();
        const formatMap = {
            simple: new simple_1.SimpleFormat(),
            json: new json_1.JsonFormat(),
        };
        if (Object.keys(formatMap).includes(format)) {
            formatter = formatMap[format];
        }
        return formatter;
    }
}
exports.FormatterFactory = FormatterFactory;
//# sourceMappingURL=formatterFactory.js.map