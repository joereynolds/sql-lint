"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const line_1 = require("./line");
const query_1 = require("./query");
/**
 * Grabs the querie(s) from the --file flag
 */
function getQueryFromFile(file) {
    const contents = fs.readFileSync(file, "utf8");
    return putContentIntoLines(contents);
}
exports.getQueryFromFile = getQueryFromFile;
function putContentIntoLines(contents) {
    let lineNumber = 1;
    const queriesFromFile = [];
    let currentQueryContent = "";
    let query = new query_1.Query();
    const skipChars = ["", "\n", "\r\n"];
    contents = stripComments(contents);
    for (let i = 0; i < contents.length; i++) {
        if (!skipChars.includes(contents[i])) {
            currentQueryContent += contents[i];
        }
        if (contents[i] === "\n") {
            if (currentQueryContent.length > 0) {
                query.lines.push(new line_1.Line(currentQueryContent, lineNumber));
            }
            currentQueryContent = "";
            lineNumber++;
        }
        if (contents[i] === ";") {
            if (currentQueryContent.length > 0) {
                query.lines.push(new line_1.Line(currentQueryContent, lineNumber));
            }
            queriesFromFile.push(query);
            query = new query_1.Query();
            currentQueryContent = "";
        }
    }
    return queriesFromFile;
}
exports.putContentIntoLines = putContentIntoLines;
/**
 * 1. Split on new line
 * 2. Filter out any lines that start with a comment
 * 3. Rejoin the lines together as a single string.
 */
function stripComments(content) {
    return content
        .split("\n")
        .map(line => {
        if (line.startsWith("--") ||
            line.startsWith("#") ||
            line.startsWith("/*")) {
            return "";
        }
        else {
            return line;
        }
    })
        .join("\n");
}
/**
 * Grabs the query from the --query flag
 * Line is always 0 since there are no
 * lines on the terminal.
 */
function getQueryFromLine(query) {
    return putContentIntoLines(query);
}
exports.getQueryFromLine = getQueryFromLine;
//# sourceMappingURL=reader.js.map