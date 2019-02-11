import { IFormat } from "./interface";
import { SimpleFormat } from "./formats/simple";

class FormatterFactory {
  public build(format: string): IFormat {
    let formatter: IFormat = new SimpleFormat();

    const formatMap: { [key: string]: IFormat } = {
      simple: new SimpleFormat()
    };

    if (Object.keys(formatMap).includes(format)) {
      formatter = formatMap[format];
    }

    return formatter;
  }
}

export { FormatterFactory };
