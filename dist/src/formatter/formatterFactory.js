"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_1 = require("./formats/simple");
class FormatterFactory {
    build(format) {
        let formatter = new simple_1.SimpleFormat();
        const formatMap = {
            simple: new simple_1.SimpleFormat()
        };
        if (Object.keys(formatMap).includes(format)) {
            formatter = formatMap[format];
        }
        return formatter;
    }
}
exports.FormatterFactory = FormatterFactory;
//# sourceMappingURL=formatterFactory.js.map