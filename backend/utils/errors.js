export class NotAuthorizedError extends Error {
  code;

  constructor(args) {
    super(args);

    this.code = 401;
  }
}

export class NotFoundError extends Error {
  code;

  constructor(args) {
    super(args);

    this.code = 404;
  }
}
