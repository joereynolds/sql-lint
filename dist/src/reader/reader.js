"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryFromLine = exports.putContentIntoLines = exports.getQueryFromFile = void 0;
const fs = require("fs");
const line_1 = require("./line");
const query_1 = require("./query");
const keywords_1 = require("../syntax/keywords");
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
    contents = stripLanguages(contents);
    contents = sanatiseQuotes(contents);
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
 * Function to escape any special characters in a string to allow
 * it to be passed to build a regex.
 * Based on https://stackoverflow.com/a/32212181/2144578
 */
function regexEscape(str) {
    str = str.replace(/\\/g, "\\\\");
    str = str.replace(/\-/g, "\\-");
    str = str.replace(/\//g, "\\/");
    str = str.replace(/\./g, "\\.");
    str = str.replace(/\^/g, "\\^");
    str = str.replace(/\$/g, "\\$");
    str = str.replace(/\*/g, "\\*");
    str = str.replace(/\+/g, "\\+");
    str = str.replace(/\-/g, "\\-");
    str = str.replace(/\?/g, "\\?");
    str = str.replace(/\(/g, "\\(");
    str = str.replace(/\)/g, "\\(");
    str = str.replace(/\[/g, "\\[");
    str = str.replace(/\]/g, "\\]");
    str = str.replace(/\{/g, "\\{");
    str = str.replace(/\}/g, "\\}");
    str = str.replace(/\|/g, "\\|");
    return str;
}
/**
 * Strips content between two delimeters, starting with a regex
 * Works across multiple lines (hence the name!) but preserves the newlines
 * themselves to allow error reporting to reflect source lines.
 *
 * Note this requires dotAll regex (s) to work across multiple lines so only
 * really works on node 9+.
 */
function multiLineReplace(content, start_regex, start_delim, end_delim) {
    // Build up a regex capturing both any start pattern,
    // and the matched between the two delimeters
    const regex = new RegExp("(" +
        start_regex +
        ")" +
        "(" +
        regexEscape(start_delim) +
        ".*?" +
        regexEscape(end_delim) +
        ")", "si");
    // Preserve new lines but delete anything else between the separators
    // You should get two matches
    const match = regex.exec(content) || [];
    if (match.length >= 2) {
        // Replace everything between the delimters except newlines
        // Note .* will not match newline without /s flag
        const newlines = match[2].replace(/.*/g, "");
        // Now replace whole regex with just the newlines left over
        content = content.replace(regex, "$1" + newlines);
    }
    return content;
}
/**
 * Strip comments as may contain SQL-like syntax which can confuse the lexer
 * Preserve new lines so output still makes sense
 */
function stripComments(content) {
    // Add a new line to end in case not there to make regex matching easier
    let added_new_line = false;
    if (content[-1] != "\n") {
        content = content + "\n";
        added_new_line = true;
    }
    // Remove any content after a dash comment until end of line
    const comment_dash_regex = new RegExp(keywords_1.Keyword.CommentDash + ".*?\n", "");
    content = content.replace(comment_dash_regex, "\n");
    // Remove any content after a hash comment until end of line
    const comment_hash_regex = new RegExp(keywords_1.Keyword.CommentHash + ".*?\n", "");
    content = content.replace(comment_hash_regex, "\n");
    // Remove any content in a multi-line comment - but preserve new lines
    content = multiLineReplace(content, "", keywords_1.Keyword.CommentMultiLineStart, keywords_1.Keyword.CommentMultiLineEnd);
    // Remove any new line we added
    if (added_new_line) {
        content = content.slice(0, -1);
    }
    return content;
}
/**
 * Strip out anything of the format:
 *   language js as $$ ... $$
 * Even over multi-lines
 * Note this depends on dotall (/./s) so requires Node 9 or greater
 */
function stripLanguages(content) {
    // The separator ($$) is above example can be different so find it
    const start_language_regex = /language\s*\w*\s*as\s*([^\s]*)/gis;
    // Iterate though all separators and remove the non-SQL code
    let result;
    while ((result = start_language_regex.exec(content)) !== null) {
        const separator = result[1].trim();
        content = multiLineReplace(content, "language\\s*\\w*\\s*as\\s*", separator, separator);
    }
    return content;
}
/**
 * Sanitise quotes to remove ; which confuses lexer
 */
function sanatiseQuotes(content) {
    let result;
    // Then remove any ; from within single quotes
    const single_quote_regex = /('[^\']*;[^\']*')/gi;
    while ((result = single_quote_regex.exec(content)) !== null) {
        const sanitised_result = result[0].replace(/;/g, "");
        content = content.replace(result[0], sanitised_result);
    }
    // Then remove any ; from within single quotes
    const double_quote_regex = /("[^\']*;[^\']*")/gi;
    while ((result = double_quote_regex.exec(content)) !== null) {
        const sanitised_result = result[0].replace(/;/g, "");
        content = content.replace(result[0], sanitised_result);
    }
    return content;
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