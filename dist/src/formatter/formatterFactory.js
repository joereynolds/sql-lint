"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_1 = require("./formats/simple");
class FormatterFactory {
    build(format) {
        let factory = new simple_1.SimpleFormat();
        const formatMap = {
            simple: new simple_1.SimpleFormat()
        };
        if (Object.keys(formatMap).includes(format)) {
            factory = formatMap[format];
        }
        return factory;
    }
}
exports.FormatterFactory = FormatterFactory;
//# sourceMappingURL=formatterFactory.js.map