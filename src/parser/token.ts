class Token implements moo.Token {

  public type: string;
  public text: string;
  public value: string;
  public offset: number;
  public line: number;
  public col: number;
  public lineBreaks: number;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }
}

export { Token };
