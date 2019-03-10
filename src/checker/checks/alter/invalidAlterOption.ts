import { IChecker } from "../../interface";
import { Alter } from "../../../barrel/statements";
import { InvalidOption } from "../generic/invalidOption";

class InvalidAlterOption extends InvalidOption implements IChecker {
  public checker = new Alter();
}

export { InvalidAlterOption };
