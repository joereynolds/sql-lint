import { Query } from "../reader/reader";
import { ILexer } from "./interface";
import { Select } from "./select";
import { Use } from "./use";
import { Keyword } from "./tokens";

function categorise(query: string) {
  query = query.trim().toLowerCase();

  if (query.startsWith(Keyword.Select)) {
    return Keyword.Select;
  }

  if (query.startsWith(Keyword.Delete)) {
    return Keyword.Delete;
  }

  if (query.startsWith(Keyword.Update)) {
    return Keyword.Update;
  }

  if (query.startsWith(Keyword.Use)) {
    return Keyword.Use;
  }

  throw new Error(`Unable to categorise query: ${query}`);
}

function tokenise(query: Query): Query {
  const category = categorise(query.getContent());
  query.category = category;

  let tokeniser: ILexer;

  if (category === "select") {
    tokeniser = new Select();
  } else if (category === "use") {
    tokeniser = new Use();
  } else {
    tokeniser = new Use();
  }

  const tokens = tokeniser.tokenise(query);
  return tokens;
}

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
function extractTableReference(tableReference: string) {
  const references = tableReference.split(".");
  const extractedReferences: any = {
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

/**
 * Removes any invalid characters from an unquoted identifier.
 * This can be a database, table, column name etc...
 */
function cleanUnquotedIdentifier(identifier: string) {
    // Remove anything that isn't an a-z 0-9 or an _
    return identifier.replace(/([^a-z0-9_*.]+)/gi, '');
}

export { categorise, tokenise, extractTableReference, cleanUnquotedIdentifier };
