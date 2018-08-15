import { Query } from "../reader/reader";
import { ILexer } from "./interface";
import { Select } from "./select"
import { Tokens } from "./tokens";
import { Use } from "./use";

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

function tokenise(query: Query): Query {
    const category = categorise(query.getContent())
    let tokeniser: ILexer;

    switch (category) {
        case "select": {
            tokeniser = new Select();
        }
        case "use": {
            tokeniser = new Use();
        }
        default:
            tokeniser = new Use();
    }

    const tokens = tokeniser.tokenise(query)
    return tokens;
}

export { categorise, tokenise };
