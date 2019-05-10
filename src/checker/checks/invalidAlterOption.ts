import { IChecker } from "../interface";
import { Alter } from "../../barrel/statements";
import { InvalidOption } from "./invalidOption";

class InvalidAlterOption extends InvalidOption implements IChecker {
  public checker = new Alter();
  public appliesTo = ['alert'];
}

export { InvalidAlterOption };
