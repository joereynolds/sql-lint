import { Query } from "../../../reader/query";
import { IParser } from "../../interface";
import * as nearley from "nearley";
import * as drop_grammar from "./dropGrammar";
import { Types } from "../../types";
import { Token } from "../../token";
import * as moo from "moo";

class Drop implements IParser {
  public options: string[] = [
    "database",
    "event",
    "function",
    "index",
    "logfile",
    "procedure",
    "schema",
    "server",
    "table",
    "view",
    "tablespace",
    "trigger"
  ];

  public tokenise(query: Query): Query {

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(drop_grammar.default));
    const ast = parser.feed(query.getContent());

    query.lines[0].tokens.push(new Token(Types.Keyword, ast.results[0].keyword.toLowerCase().trim()));
    query.lines[0].tokens.push(new Token(Types.Option, ast.results[0].option.toLowerCase().trim()));

    return query;
  }
}

export { Drop };
