import { Query } from "../../../reader/query";
import { ILexer } from "../../interface";
import { Types } from "../../types";
import * as nearley from "nearley";
import * as alter_grammar from "./alterGrammar";
import { Keyword } from "../../../syntax/keywords";
import { Token } from "../../token";

class Alter implements ILexer {
  public options: string[] = [
    "online",
    "offline",
    "ignore",
    "database",
    "event",
    "function",
    "procedure",
    "server",
    "table",
    "tablespace",
    "view"
  ];

  public tokenise(query: Query): Query {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(alter_grammar.default));
    const ast = parser.feed(query.getContent());

    query.lines[0].tokens.push(new Token(Types.Keyword, ast.results[0].keyword.toLowerCase().trim()));
    query.lines[0].tokens.push(new Token(Types.Option, ast.results[0].option.toLowerCase().trim()));

    return query;
  }
}

export { Alter };
