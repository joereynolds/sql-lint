import { Query } from "../reader/query";
import { ILexer } from "./interface";
import { Keyword } from "./tokens";
import { Create } from "./statements/create";
import { Drop } from "./statements/drop";
import { Select } from "./statements/select";
import { Use } from "./statements/use";

function categorise(query: string) {
  query = query.trim().toLowerCase();

  // Cast the Keyword enum so we can to lookups on it without TypeScript complaining.
  const keywordLookup: { [keywordName: string]: string } = Keyword as any;

  const result = Object.keys(Keyword).find(keyword =>
    query.startsWith(keywordLookup[keyword])
  );

  if (result) {
    return keywordLookup[result];
  }

  throw new Error(
    `Unable to categorise query: ${query}. The query must start with one of ${Object.keys(
      Keyword
    )}`
  );
}

function tokenise(query: Query): Query {
  const category = categorise(query.getContent());
  query.category = category;

  let tokeniser: ILexer;

  if (category === Keyword.Select) {
    tokeniser = new Select();
  } else if (category === Keyword.Use) {
    tokeniser = new Use();
  } else if (category === Keyword.Drop) {
    tokeniser = new Drop();
  } else if (category === Keyword.Create) {
    tokeniser = new Create();
  } else {
    tokeniser = new Use();
  }
  return tokeniser.tokenise(query);
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
  return identifier.replace(/([^a-z0-9_*.]+)/gi, "");
}

export { categorise, tokenise, extractTableReference, cleanUnquotedIdentifier };
