function ValidationError (message) {
  this.name = 'ValidationError';
  this.status = 400;
  this.message = message || 'ValidationError';
  this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
module.exports.ValidationError = ValidationError;

function AuthorizationError (message) {
  this.name = 'AuthorizationError';
  this.status = 403;
  this.message = message || 'AuthorizationError';
  this.stack = (new Error()).stack;
}
AuthorizationError.prototype = Object.create(Error.prototype);
AuthorizationError.prototype.constructor = AuthorizationError;
module.exports.AuthorizationError = AuthorizationError;

function NotFoundError (message) {
  this.name = 'NotFoundError';
  this.status = 404;
  this.message = message || 'NotFoundError';
  this.stack = (new Error()).stack;
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;
module.exports.NotFoundError = NotFoundError;

