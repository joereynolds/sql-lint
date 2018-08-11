
class Tokens {

    /**
     * The raw SQL query being tokenised
     * i.e. "SELECT * FROM person"
     */
    public content: string;

    /**
     * The tokens that have come from tokenising the query
     * i.e. ["keyword", "table_reference", "keyword", "table_reference"]
     */
    public tokens: string[] = [];

    /**
     * The tokens and the query together
     * i.e. [
     *     ["keyword", "select"]
     *     ["table_reference", "*"]
     *     ["keyword", "from"]
     *     ["table_reference", "person"]
     * ]
     */
    public tokenised: string[][];

    constructor(content: string) {
        this.content = content;
    }

    public getTokenised(): string[][] {
        return [["nothing"]];
    }

    public getTokens(): string[] {
        return this.tokens;
    }

    public getContent(): string {
        return this.content;
    }

    public addToken(token: string): void {
        this.tokens.push(token);
    }

    public addTokenised(tokenised: string[]) {
        //
    }
}

const TOKENS = {
    "keyword": [
        "select",
		"delete",
		"update",
		"from",
		"where",
		"set",
		"join",
		"having",
		"limit",
		"else",
		"if",
		"begin",
    ],

    "comment": ["#", "--"],
	"boolean":     ["true", "false", "null"],
	"conditional": ["and", "or"],
	"operator":    ["+", "-", "/"],
};

export { TOKENS, Tokens };
