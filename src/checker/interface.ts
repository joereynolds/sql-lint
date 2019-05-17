import { Query } from "../reader/query";

interface IChecker {
  message: string;
  requiresConnection: boolean;
  appliesTo: string[];
  check(query: Query): any;
}

export { IChecker };
