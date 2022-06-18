import { Printer } from "./printer";
import IDatabase from "./database/interface";
import { IMessage } from "./formatter/interface";
import { putContentIntoLines } from "./reader/reader";
import { JsonFormat } from "./formatter/formats/json";
import { CheckerRunner } from "./checker/checkerRunner";
import databaseFactory from "./database/databaseFactory";

interface Parameters {
  sql: string;
  host?: string;
  user?: string;
  port?: number;
  driver?: string;
  prefix?: string;
  password?: string;
  database?: string;
  verbosity?: number;
}

export default async ({
  sql,
  host,
  port,
  user = "",
  prefix = "",
  password = "",
  database = "",
  verbosity = 0,
  driver = "mysql",
}: Parameters): Promise<IMessage[]> => {
  const printer = new Printer(verbosity, new JsonFormat());

  let db: IDatabase | undefined;
  if (host) {
    db = databaseFactory(driver, host, user, password, database, port);
  }

  const runner = new CheckerRunner();
  await runner.run(putContentIntoLines(sql), printer, prefix, [], driver, db);

  if (db) {
    db.end();
  }

  return printer.messages;
};
