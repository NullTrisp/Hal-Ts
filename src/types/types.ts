export class PageNotFoundError extends Error {
  constructor() {
    super("The page you are trying to obtain does not exists");
  }
}
