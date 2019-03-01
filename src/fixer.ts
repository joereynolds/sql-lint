import { Keyword } from "./lexer/tokens";
import { Query } from "./reader/query";
import { titleCase } from "./util";

class Fixer {
  public fix(query: Query) {
    return this.fixKeywords(query);
  }

  private fixKeywords(query: Query) {
    const keywords = Object.keys(Keyword);

    let fixed: string = "";

    query.lines.forEach(line => {
      const content = line.content.split(" ");

      content.forEach(word => {
        if (keywords.includes(titleCase(word))) {
          fixed += `${word.toUpperCase()}\n`;
        } else {
          fixed += word;
        }
      });
    });

    return fixed;
  }
}

export { Fixer };
