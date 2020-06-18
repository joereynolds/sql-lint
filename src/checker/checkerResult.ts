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
   *  The additionalInformation for the current line
   */
  public additionalInformation: string;

  constructor(line: number, content: string, additionalInformation?: string) {
    this.line = line;
    this.content = content;
    this.additionalInformation = additionalInformation ?? "";
  }
}

export { CheckerResult };
