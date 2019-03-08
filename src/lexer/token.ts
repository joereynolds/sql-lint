class Token {
  public type: string;
  public value: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }
}

export { Token };
