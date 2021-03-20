import { IChecker } from "../../interface";
import { Alter } from "../../../barrel/statements";
import { InvalidOption } from "../invalidOption";

class PostgresInvalidAlterOption extends InvalidOption implements IChecker {
  public checker = new Alter();
  public appliesTo = ["alter"];
}

export { PostgresInvalidAlterOption };
