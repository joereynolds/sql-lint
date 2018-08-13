import { ILexer } from "./interface";
import { Select } from "./select"
import { Tokens } from "./tokens";

function categorise(query: string) {
    query = query.trim().toLowerCase();

    if (query.startsWith("select")) {
        return "select";
    }

    if (query.startsWith("delete")) {
        return "delete";
    }

    if (query.startsWith("update")) {
        return "update";
    }

    if (query.startsWith("use")) {
        return "use";
    }

    throw new Error(`Unable to categorise query: ${query}`);
}

function tokenise(query: string): Tokens {
    const category = categorise(query)
    let tokeniser: ILexer;

    switch (category) {
        case "select": {
            tokeniser = new Select();
        }
        default:
            tokeniser = new Select();
    }

    const tokens = tokeniser.tokenise(query)
    return tokens;
}

export { categorise, tokenise };
