/**
 * Every 'checker' brings back a result of type CheckerResult.
 */
class CheckerResult {
    /**
     * The line number of the content
     */
    public line: number;

    /**
     *  The content for the current line
     */
    public content: string;

    /**
     * The tokens for the content of the line
     */
    public tokens: string;

    constructor(line: number, content: string, tokens: string) {
        this.line = line;
        this.content = content;
        this.tokens = tokens;
    }
}

export { CheckerResult };
