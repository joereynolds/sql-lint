import { Query } from "../../reader/reader";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";

class MySqlError implements IChecker {

    public errors: any;

    // Note that we don't follow the interface correctly for MySQL Error
    // since the error message is dynamically generated.
    public message = "";

    constructor(errors: any) {
        this.errors = errors;
    }

    public check(query: Query): CheckerResult {
        const allowedCategories = [
            'select',
            'insert',
            'replace',
            'update',
        ];

        if (allowedCategories.includes(query.category)) {
            const lineNumber = query.lines[0].num;
            const message = this.concatErrorObject(this.errors);
            return new CheckerResult(lineNumber, message);
        }

        return new CheckerResult(0, "");
    }

    private concatErrorObject(error: any) {
        return `[${error.code}] ${error.sqlMessage}`;
    }
}

export { MySqlError };
