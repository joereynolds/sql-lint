class Line {
  public num: number;
  public content: string;
  public tokens: string[][] = [];

  constructor(content: string, num: number) {
    this.content = content;
    this.num = num;
  }
}

export { Line };
