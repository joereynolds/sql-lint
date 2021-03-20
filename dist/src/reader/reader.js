"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryFromLine = exports.putContentIntoLines = exports.getQueryFromFile = void 0;
const fs = require("fs");
const line_1 = require("./line");
const query_1 = require("./query");
const keywords_1 = require("../syntax/keywords");
const reMultilineComments = /\/\*[\s\S]+?\*\//g;
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
    const skipChars = ["", keywords_1.Keyword.Newline, keywords_1.Keyword.WindowsNewline];
    contents = stripComments(contents);
    for (let i = 0; i < contents.length; i++) {
        if (!skipChars.includes(contents[i])) {
            currentQueryContent += contents[i];
        }
        if (contents[i] === keywords_1.Keyword.Newline) {
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
    content = content.replace(reMultilineComments, "");
    const contentInLines = content.split(keywords_1.Keyword.Newline);
    for (let i = 0; i < contentInLines.length; i++) {
        if (contentInLines[i].startsWith(keywords_1.Keyword.CommentDash) ||
            contentInLines[i].startsWith(keywords_1.Keyword.CommentHash) ||
            contentInLines[i].startsWith(keywords_1.Keyword.CommentMultiLineStart)) {
            contentInLines[i] = "";
        }
    }
    return contentInLines.join(keywords_1.Keyword.Newline);
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