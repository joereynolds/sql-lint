import { Query } from "../reader/query";

interface IChecker {
  message: string;
  additionalInformation: string;
  requiresConnection: boolean;
  appliesTo: string[];
  check(query: Query): any;
}

export { IChecker };
