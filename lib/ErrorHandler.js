'use strict';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFoundErrror';
    Error.captureStackTrace(this, 'NotFoundErrror');
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'Validation Error';
    Error.captureStackTrace(this, 'ValidationError');
  }
}