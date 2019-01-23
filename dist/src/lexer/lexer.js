"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_1 = require("./select");
const use_1 = require("./use");
const tokens_1 = require("./tokens");
function categorise(query) {
    query = query.trim().toLowerCase();
    if (query.startsWith(tokens_1.Keyword.Select)) {
        return tokens_1.Keyword.Select;
    }
    if (query.startsWith(tokens_1.Keyword.Delete)) {
        return tokens_1.Keyword.Delete;
    }
    if (query.startsWith(tokens_1.Keyword.Update)) {
        return tokens_1.Keyword.Update;
    }
    if (query.startsWith(tokens_1.Keyword.Use)) {
        return tokens_1.Keyword.Use;
    }
    if (query.startsWith(tokens_1.Keyword.Create)) {
        return tokens_1.Keyword.Create;
    }
    if (query.startsWith(tokens_1.Keyword.Drop)) {
        return tokens_1.Keyword.Drop;
    }
    if (query.startsWith(tokens_1.Keyword.Insert)) {
        return tokens_1.Keyword.Insert;
    }
    throw new Error(`Unable to categorise query: ${query}. The query must start with one of ${Object.keys(tokens_1.Keyword)}`);
}
exports.categorise = categorise;
function tokenise(query) {
    const category = categorise(query.getContent());
    query.category = category;
    let tokeniser;
    if (category === tokens_1.Keyword.Select) {
        tokeniser = new select_1.Select();
    }
    else if (category === tokens_1.Keyword.Use) {
        tokeniser = new use_1.Use();
    }
    else {
        tokeniser = new use_1.Use();
    }
    const tokens = tokeniser.tokenise(query);
    return tokens;
}
exports.tokenise = tokenise;
/*
 *
 * extractTableReference('symfony.gigs') => [
 *     'database': 'symfony',
 *     'table': 'gigs'
 * ]
 *
 * extractTableReference('symfony.gigs.venue') => [
 *     'database': 'symfony',
 *     'table': 'gigs',
 *     'column': 'venue'
 * ]
 *
 * extractTableReference('gigs.venue') => [
 *     'table': 'gigs',
 *     'column': 'venue'
 * ]
 *
 * extractTableReference('venue') => [
 *     'column': 'venue'
 * ]
 *
 * Assumptions:
 *   - A value on its own e.g. "venue" is assumed to be a table.
 *   - 3 values e.g. "symfony.gigs.venue" is assumed to be database.table.column
 *   - 2 values is assumed to be database.table
 */
function extractTableReference(tableReference) {
    const references = tableReference.split(".");
    const extractedReferences = {
        3: {
            database: references[0],
            table: references[1],
            column: references[2]
        },
        2: {
            database: references[0],
            table: references[1]
        },
        1: {
            table: references[0]
        }
    };
    return extractedReferences[references.length];
}
exports.extractTableReference = extractTableReference;
/**
 * Removes any invalid characters from an unquoted identifier.
 * This can be a database, table, column name etc...
 */
function cleanUnquotedIdentifier(identifier) {
    // Remove anything that isn't an a-z 0-9 or an _
    return identifier.replace(/([^a-z0-9_*.]+)/gi, "");
}
exports.cleanUnquotedIdentifier = cleanUnquotedIdentifier;
//# sourceMappingURL=lexer.js.map