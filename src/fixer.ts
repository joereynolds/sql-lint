import { Keyword } from "./lexer/tokens";
import { Query } from "./reader/query";

class Fixer {
  public fix(query: Query) {
    return this.fixKeywords(query);
  }

  private fixKeywords(query: Query) {
    const keywords = Object.keys(Keyword);

    query.lines.forEach(line => {
      const content = line.content.split(' ')
    
        content.forEach(word => {

            
        })
      console.log(line);
    });
  }
}

export { Fixer };
