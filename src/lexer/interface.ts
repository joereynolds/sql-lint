import { Tokens } from "./tokens";

interface ILexer {
  tokenise(query: string): Tokens;
}

export { ILexer };
