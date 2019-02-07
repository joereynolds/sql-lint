import { IFormat } from "./interface";
import { SimpleFormat } from "./formats/simple";

class FormatterFactory {
  public build(format: string): IFormat {
    let factory: IFormat = new SimpleFormat();

    const formatMap: { [key: string]: IFormat } = {
      simple: new SimpleFormat()
    };

    if (Object.keys(formatMap).includes(format)) {
      factory = formatMap[format];
    }

    return factory;
  }
}

export { FormatterFactory };
