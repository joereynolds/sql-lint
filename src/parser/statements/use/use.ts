import { Query } from "../../../reader/query";
import { IParser } from "../../interface";
import * as moo from "moo";
import * as nearley from "nearley";
import * as use_grammar from "./useGrammar";
import {Token} from "../../token";
import {Types} from "../../types";

// Testing: npm run build && ./dist/src/main.js -q "use test;"

class Use implements IParser {
  public options: string[] = [];
  public parse(query: Query): Query {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(use_grammar.default));
    const ast = parser.feed(query.getContent());

    query.lines[0].tokens.push(new Token(
        ast.results[0].keyword.type, 
        ast.results[0].keyword.value.toLowerCase().trim()
    ));

    query.lines[0].tokens.push(new Token(
        ast.results[0].table_reference.type, 
        ast.results[0].table_reference.value
    ));

    return query;
  }
}

export { Use };
