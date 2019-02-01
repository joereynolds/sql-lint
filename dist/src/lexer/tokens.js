"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = {
    keyword: [
        "select",
        "delete",
        "update",
        "from",
        "where",
        "set",
        "join",
        "having",
        "limit",
        "else",
        "if",
        "begin"
    ],
    comment: ["#", "--"],
    boolean: ["true", "false", "null"],
    conditional: ["and", "or"],
    operator: ["+", "-", "/"]
};
var Types;
(function (Types) {
    Types["Keyword"] = "keyword";
    Types["TableReference"] = "table_reference";
    Types["DropItem"] = "drop_item";
    Types["Unidentified"] = "???";
})(Types = exports.Types || (exports.Types = {}));
var Keyword;
(function (Keyword) {
    Keyword["Begin"] = "begin";
    Keyword["Create"] = "create";
    Keyword["Delete"] = "delete";
    Keyword["Drop"] = "drop";
    Keyword["Else"] = "else";
    Keyword["From"] = "from";
    Keyword["Having"] = "having";
    Keyword["If"] = "if";
    Keyword["Insert"] = "insert";
    Keyword["Join"] = "join";
    Keyword["Limit"] = "limit";
    Keyword["Select"] = "select";
    Keyword["Set"] = "set";
    Keyword["Update"] = "update";
    Keyword["Use"] = "use";
    Keyword["Where"] = "where";
})(Keyword = exports.Keyword || (exports.Keyword = {}));
//# sourceMappingURL=tokens.js.map