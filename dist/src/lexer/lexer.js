"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUnquotedIdentifier = exports.extractTableReference = exports.tokenise = exports.categorise = void 0;
const keywords_1 = require("../syntax/keywords");
const statementFactory_1 = require("./statementFactory");
function categorise(query) {
    query = query.trim().toLowerCase();
    // Cast the Keyword enum so we can to lookups on it without TypeScript complaining.
    const keywordLookup = keywords_1.Keyword;
    const result = Object.keys(keywords_1.Keyword).find((keyword) => query.startsWith(keywordLookup[keyword]));
    if (result) {
        return keywordLookup[result];
    }
    return "";
}
exports.categorise = categorise;
function tokenise(query) {
    const category = categorise(query.getContent());
    const statementFactory = new statementFactory_1.StatementFactory();
    const statement = statementFactory.build(category);
    query.category = category;
    return statement.tokenise(query);
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
            column: references[2],
        },
        2: {
            database: references[0],
            table: references[1],
        },
        1: {
            table: references[0],
        },
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