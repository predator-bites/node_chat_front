export class ApiError extends Error {
  status: number;
  errors: ErrorObject;

  constructor(message: string, status: number, errors: ErrorObject) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static badRequest(messages: ErrorMessage[]) {
    return new ApiError('Bad request', 400, { errors: messages });
  }

  static notFound(messages: ErrorMessage[]) {
    return new ApiError('Not found', 404, { errors: messages });
  }
}
