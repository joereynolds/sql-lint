import { IFormat } from "../interface";

class SimpleFormat implements IFormat {
  public getMessage() {
    return "implement";
  }
}

export { SimpleFormat };
