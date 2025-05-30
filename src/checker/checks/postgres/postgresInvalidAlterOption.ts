import { IChecker } from "../../interface";
import { PostgresAlter } from "../../../barrel/statements";
import { InvalidOption } from "../invalidOption";

class PostgresInvalidAlterOption extends InvalidOption implements IChecker {
  public checker = new PostgresAlter();
  public appliesTo = ["alter"];
}

export { PostgresInvalidAlterOption };
