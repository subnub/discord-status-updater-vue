export class NotAuthorizedError extends Error {
  code;

  constructor(args) {
    super(args);

    this.code = 401;
  }
}
