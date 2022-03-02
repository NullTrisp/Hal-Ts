export class PageNotFoundError extends Error {
  constructor() {
    super("The page you are trying to obtain does not exists");
  }
}

export class InvalidChunkSize extends Error {
  constructor() {
    super("Cannot create chunk of data with the given value");
  }
}

export class InvalidPage extends Error {
  constructor() {
    super("Cannot create chunk of data with the given value");
  }
}
