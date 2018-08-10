
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

    throw new Error(`Unable to categorise query: ${query}`);
}

export { categorise };
