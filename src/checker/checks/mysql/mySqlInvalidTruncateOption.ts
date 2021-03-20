import { IChecker } from "../../interface";
import { Truncate } from "../../../barrel/statements";
import { InvalidOption } from "../invalidOption";

class MySqlInvalidTruncateOption extends InvalidOption implements IChecker {
  public checker = new Truncate();
  public appliesTo = ["truncate"];
}

export { MySqlInvalidTruncateOption };
