import { IChecker } from "../../interface";
import { Truncate } from "../../../barrel/statements";
import { InvalidOption } from "../generic/invalidOption";

class InvalidTruncateOption extends InvalidOption implements IChecker {
  public checker = new Truncate();
}

export { InvalidTruncateOption };
