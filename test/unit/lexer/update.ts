import { Update } from "../../../src/lexer/update";
import { Query, getQueryFromLine } from "../../../src/reader/reader";

it('should tokenise update keyword', () => {
  let query: Query = getQueryFromLine(
    "UPDATE test_table SET test_column = 1"
  );

  

  let update = new Update();
  update.tokenise(query);
});
