import { ILexer } from "./interface";
import {
  Alter,
  Select,
  Use,
  Create,
  Drop,
  Truncate,
  Rename,
} from "../barrel/statements";

class StatementFactory {
  public build(statement: string): ILexer {
    let builtStatement = new Select();

    const statementMap: { [key: string]: ILexer } = {
      select: new Select(),
      use: new Use(),
      drop: new Drop(),
      create: new Create(),
      alter: new Alter(),
      truncate: new Truncate(),
      rename: new Rename(),
    };

    if (Object.keys(statementMap).includes(statement)) {
      builtStatement = statementMap[statement];
    }

    return builtStatement;
  }
}

export { StatementFactory };
