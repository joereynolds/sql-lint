import { Query } from "../reader/query";

interface IChecker {
  message: string;
  additionalInformation: string;
  requiresConnection: boolean;
  appliesTo: string[];
  getName(): string;
  check(query: Query): any;
}

export { IChecker };
