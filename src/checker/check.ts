import * as p from "param-case";

abstract class Check {
  public prefix: string = `[sql-lint: ${this.getName()}] `;

  /**
   * Infers the name of the error message from the child's
   * class name.
   */
  public getName() {
    return p.paramCase(this.constructor.name);
  }
}

export { Check };
