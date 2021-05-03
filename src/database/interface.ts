export default interface IDatabase {
  /**
   * Runs an EXPLAIN on the query. If it doesn't run successfully, errors will come through,
   * which is what we want.
   */
  lintQuery(query: string, callback: any): void;
  end(): void;
}