class UnauthorizedError {
  public readonly statusCode: number;

  constructor(statusCode = 401) {
    this.statusCode = statusCode;
  }
}

export default UnauthorizedError;
