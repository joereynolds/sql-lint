import * as fs from "fs";

/**
 * Grabs the querie(s) from the --file flag
 */
export function getQueryFromFile(file: string): string[] {
    // New
    let lineNumber = 1;
    const queriesFromFile: any[] = [];
    let currentQuery: any[] = [];
    let currentQueryContent: string = '';
    const contents = fs.readFileSync(file, 'utf8');

    for (let i = 0; i < contents.length; i++) {
        currentQueryContent += contents[i];

        if (contents[i] === '\n') {
            currentQuery.push({"content": currentQueryContent, "line": lineNumber});
            currentQueryContent = ''
            lineNumber++;
        }

        if (contents[i] === ';') {
            currentQuery.push({"content": currentQueryContent, "line": lineNumber});
            queriesFromFile.push(currentQuery);
            currentQuery = []
            currentQueryContent = '';
        }
    }
    console.log(queriesFromFile);

    // Old
    const content = fs.readFileSync(file, 'utf8');
    const queries = content.split(';');
    return queries
}

/**
 * Grabs the query from the --query flag    
 * Line is always 0 since there are no    
 * lines on the terminal.
 */
export function getQueryFromLine(query: string) {
    return [{"content": query, "line": 0}];
}

function populateLineContent(query: string) {
    //
}
